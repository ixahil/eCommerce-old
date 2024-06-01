import mongoose, { Schema } from "mongoose";
import { CollectionModal } from "./index.js";
import { ApiError } from "../utils/index.js";
import { BrandModel } from "./brand.model.js";

const productSchema = new Schema(
  {
    name: {
      required: [true, "Product Name is required"],
      type: String,
    },
    sku: {
      type: String,
      required: [true, "Product SKU is Required"],
      unique: true,
      index: {
        unique: true,
      },
    },
    description: {
      required: [true, "Product description is Required"],
      type: String,
    },
    collections: {
      _id: { type: Schema.Types.ObjectId, ref: "collection" },
      handle: { type: String },
      name: { type: String },
    },
    brand: {
      _id: { type: Schema.Types.ObjectId, ref: "brand" },
      handle: String,
      name: String,
    },
    price: {
      default: 0,
      type: Number,
    },
    stock: {
      default: 0,
      type: Number,
    },
    mainImage: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `http://localhost:8080/public/static/placeholders/product.jpg`,
        localPath: "public/static/placeholders/product.jpg",
      },
    },
    subImages: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isFreeShipping: {
      type: Boolean,
      default: false,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.pre("save", async function (next) {
  if (this.isNew) {
  }
});

productSchema.methods.assignCollectionAndBrands = async function (
  existingProduct
) {
  const collection = await CollectionModal.findOneAndCreate(
    this,
    existingProduct
  );
  const brand = await BrandModel.findOneAndCreate(this, existingProduct);
  this.collections = {
    _id: collection._id,
    handle: collection.handle,
    name: collection.name,
  };
  this.brand = {
    _id: brand._id,
    handle: brand.handle,
    name: brand.name,
  };

  return await this.save();
};

productSchema.statics.createNewProduct = async function (productData, user) {
  let product = await this.create({ ...productData, owner: user._id });
  product = await product.assignCollectionAndBrands();
  return product;
};

productSchema.statics.updateProduct = async function (sku, productData) {
  const existingProduct = await this.findOne({ sku });

  if (!existingProduct) {
    throw new ApiError(404, "Product not found");
  }

  const updatedProduct = await this.findOneAndUpdate({ sku }, productData, {
    new: true,
  });

  await updatedProduct.assignCollectionAndBrands(existingProduct);

  return updatedProduct;
};

export const ProductModel = mongoose.model("Product", productSchema);
