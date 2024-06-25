import { ProductFilters } from "../lib/contants.js";
import { CollectionModal, ProductModel } from "../models/index.js";
import { deleteFolder } from "../utils/imageUpload.js";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  moveImage,
} from "../utils/index.js";
import { faker } from "@faker-js/faker";
import crypto, { randomUUID } from "crypto";

export const updateProductStatus = asyncHandler(async (req, res, next) => {
  const { sku } = req.params;
  const { status } = req.body;
  const product = await ProductModel.findOneAndUpdate(
    { sku },
    { isVisible: status }
  );
  res.status(200).json(new ApiResponse(200, product));
});

export const getProductsByCollection = asyncHandler(async (req, res, next) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 8;
  const brands = req.query.brand?.split(",") || [];

  const { collection } = req.params;
  const pipeline = [
    {
      $match: {
        "collections.handle": collection,
        ...(brands.length > 0 && { "brand.handle": { $in: brands } }),
      },
    },
    { $sort: { timestamp: -1 } },
    {
      $facet: {
        products: [{ $skip: (page - 1) * 8 }, { $limit: limit }],
        facets: [
          { $count: "totalCount" },
          {
            $addFields: {
              totalPages: { $ceil: { $divide: ["$totalCount", limit] } },
            },
          },
          { $addFields: { collection: collection } },
          { $addFields: { currentPage: page } },
          { $addFields: { nextPage: { $add: [page, 1] } } },
          { $addFields: { limit: 8 } },
        ],
      },
    },
    {
      $unwind: "$facets",
    },

    // {
    //   $project: {
    //     data: {
    //       products: "$products",
    //       facets: { $arrayElemAt: ["$facets", 0] },
    //     },
    //   },
    // },
    // {
    //   $replaceRoot: { newRoot: "$data" },
    // },
  ];

  const products = await ProductModel.aggregate(pipeline);

  res.status(200).json(new ApiResponse(200, products[0]));
});

export const createNewProduct = asyncHandler(async (req, res, next) => {
  const {
    sku,
    collection,
    description,
    name,
    brand,
    price,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  } = req.body;

  const requiredData = {
    sku,
    collections: {
      name: collection,
    },
    description,
    name,
    brand: {
      name: brand,
    },
  };

  const notEnoughData = Object.values(requiredData).some((data) => !data);

  if (notEnoughData) {
    throw new ApiError(
      400,
      `Not enough data, please fill the required details`
    );
  }

  const productData = {
    ...requiredData,
    price,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
  };

  const product = await ProductModel.createNewProduct(productData, req.user);
  const { mainImage, subImages } = await moveImage(req, "products/images", sku);

  product.mainImage = mainImage ? mainImage[0] : {};
  product.subImages = subImages || [];

  await product.save();

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully."));
});

export const editProduct = asyncHandler(async (req, res, next) => {
  const sku = req.params.sku;
  const {
    collection,
    description,
    name,
    brand,
    price,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
    _id,
    prevCollection,
  } = req.body;

  const requiredData = {
    collections: {
      name: collection,
    },
    description,
    name,
    brand: {
      name: brand,
    },
    _id,
  };

  const notEnoughData = Object.values(requiredData).some((data) => !data);

  if (notEnoughData) {
    throw new ApiError(
      400,
      `Not enough data, please fill the required details`
    );
  }
  const productData = {
    _id,
    ...requiredData,
    price,
    stock,
    isFreeShipping,
    isFeatured,
    isVisible,
    prevCollection,
  };

  const product = await ProductModel.updateProduct(sku, productData);

  const { mainImage, subImages } = await moveImage(req, "products/images", sku);

  product.mainImage = mainImage ? mainImage[0] : {};
  product.subImages = subImages || [];

  await product.save();

  res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product edit successfully"));
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const sku = req.params.sku;
  const product = await ProductModel.findOneAndDelete({ sku });
  deleteFolder("public/static/products/images/" + sku);

  if (!product) throw new ApiError(400, "Product not exist");

  res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product deleted successfully"));
});

export const getProducts = asyncHandler(async (req, res, next) => {
  let { keywords, page, limit, viewId } = req.query;
  const brands = req.query.brand?.split(",") || [];

  const filter = ProductFilters.find((filter) => filter.viewId === viewId);

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 8;
  const commonPipeline = [
    { $sort: { timestamp: -1 } },
    {
      $facet: {
        products: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        facets: [
          { $count: "totalCount" },

          // { $addFields: { collection: collection } },
          {
            $addFields: {
              currentPage: page,
              totalPages: { $ceil: { $divide: ["$totalCount", limit] } },
              startIndex: { $add: [(page - 1) * limit, 1] }, // Calculate startIndex of current products
              nextPage: { $add: [page, 1] },
              limit: limit,
            },
          },
          // { $addFields: { currentPage: page } },
          // { $addFields: { startIndex: 1 } },
          // { $addFields: { endIndex: { $size: "$products" } } },
          // { $addFields: { nextPage: { $add: [page, 1] } } },
          // { $addFields: { limit: limit } },
        ],
      },
    },
    {
      $unwind: "$facets",
    },
  ];

  const queries = [];
  keywords &&
    queries.push({
      $match: {
        ...(brands.length > 0 && { "brand.handle": { $in: brands } }),
        $or: [
          { name: { $regex: keywords, $options: "i" } },
          { sku: { $regex: keywords, $options: "i" } },
        ],
      },
    });
  filter?.query && queries.push({ $match: filter?.query });

  const pipeline = [...queries.filter(Boolean), ...commonPipeline];

  const products = await ProductModel.aggregate(pipeline);

  res.status(200).json(new ApiResponse(200, products[0]));
});
export const getAProduct = asyncHandler(async (req, res, next) => {
  const sku = req.params.sku;

  const product = await ProductModel.findOne({ sku }).populate("collections");

  res.status(200).json(new ApiResponse(200, { product }));
});

//// Gnerating and saving faker products data
// Data Generating
const collections = [
  "Men's Collection",
  "Women's Collection",
  "Bags",
  "Accessories",
  "Gears",
  "Sale",
  "Clearance",
];

const owners = [
  { _id: "664241c0d07aeb94805c5478" },
  { _id: "66425bcbc3aa190afbf3a215" },
];

const brands = [
  "Nike",
  "Adidas",
  "Apple",
  "Samsung",
  "Google",
  // Add more brands as needed
];

const dataGenerator = async (start, end) => {
  for (let i = start; i < end; i++) {
    const randomIndex = Math.floor(Math.random() * collections.length);
    const randomIndexOwner = Math.floor(Math.random() * owners.length);
    const randomBrands = Math.floor(Math.random() * brands.length);
    const collection = collections[randomIndex];
    const owner = owners[randomIndexOwner];
    const brand = brands[randomBrands];

    const product = {
      owner: owner,
      sku: `SKU ${i}`,
      isFeatured: Math.random() < 0.5,
      isFreeShipping: Math.random() < 0.5,
      isVisible: true,
      name: faker.commerce.product() + " Product",
      brand: {
        name: brand,
      },
      price: faker.commerce.price({ min: 10, max: 1000, dec: 2 }),
      stock: faker.number.int(100),
      description: faker.lorem.paragraphs(),
      collections: {
        name: collection,
      },
      mainImage: {
        url: "http://localhost:8080/public/static/placeholders/product-placeholder.png",
        localPath: faker.string.uuid(),
      },
      subImages: [
        {
          url: "http://localhost:8080/public/static/placeholders/product-placeholder.png",
          localPath: faker.string.uuid(),
        },
        {
          url: "http://localhost:8080/public/static/placeholders/product-placeholder.png",
          localPath: faker.string.uuid(),
        },
      ],
    };

    // let createdProduct = await ProductModel.create(product);
    // const newCategory = await CollectionModal.findOneAndCreate(
    //   createdProduct,
    //   product.collection
    // );
    // createdProduct.collections._id = newCategory._id;
    // createdProduct.collections.handle = newCategory.handle;

    // await createdProduct.save();

    await ProductModel.createNewProduct(product, product.owner);
  }
};

const generateAndSaveProducts = async () => {
  // Generate products
  const generatedProducts = dataGenerator(1, 50);

  // try {
  //   // Save generated products to the database
  //   const savedProducts = await ProductModel.insertMany(generatedProducts);
  //   savedProducts.forEach(async (product) => {
  //     const category = await CategoryModel.findOneAndCreate(product);
  //     product.category._id = category._id;
  //     await product.save();
  //   });
  // } catch (error) {
  //   console.error("Error saving products:", error);
  // }
};

// generateAndSaveProducts();
