import { OrderFilters } from "../lib/contants.js";
import { OrderModel, ProductModel } from "../models/index.js";
import { ApiResponse, asyncHandler } from "../utils/index.js";

export const getAllOrders = asyncHandler(async (req, res, next) => {
  let { keywords, page, limit, viewId } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 8;

  const filter = OrderFilters.find((filter) => filter.viewId === viewId);

  const commonPipeline = [
    { $sort: { timestamp: -1 } },

    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "items.products",
      },
    },

    {
      $facet: {
        orders: [{ $skip: (page - 1) * limit }, { $limit: limit }],
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
  !isNaN(keywords) &&
    queries.push({ $match: { orderNumber: parseInt(keywords) } });
  filter?.query && queries.push({ $match: filter?.query });

  const orders = await OrderModel.aggregate([
    ...queries.filter(Boolean),

    ...commonPipeline,
  ]);

  res.status(200).json(new ApiResponse(200, orders[0]));
});

export const createNewOrder = asyncHandler(async (req, res, next) => {
  const orderData = {
    ...req.body,
    customer: req.user._id,
  };

  const order = await OrderModel.create(orderData);

  const productUpdateOperations = orderData.items.map((item) => {
    return {
      updateOne: {
        filter: {
          _id: item.productId,
          stock: { $gt: 0 },
        },

        update: {
          $inc: {
            stock: -parseInt(item.quantity),
          },
        },
      },
    };
  });

  await ProductModel.bulkWrite(productUpdateOperations);

  res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully."));
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .json(new ApiResponse(200, order, "Order updated successfully!."));
});
