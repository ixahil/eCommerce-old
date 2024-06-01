import { BrandModel } from "../models/index.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";

export const getBrands = asyncHandler(async (req, res, next) => {
  // const collection = await BrandModel.find({}, {}, { sort: { order: 1 } });
  const brands = await BrandModel.aggregate([
    {
      $project: {
        _id: 0, // Exclude _id field if not needed
        label: "$name", // Rename "name" field to "label"
        value: "$handle", // Rename "handle" field to "value"
      },
    },
  ]);
  res.status(200).json(new ApiResponse(200, { brands }));
});

export const getABrand = asyncHandler(async (req, res, next) => {
  const { brand } = req.params;

  const existingBrand = await BrandModel.find({
    handle: {
      $regex: new RegExp(`^${brand}$`, "i"),
    },
  });

  if (!existingBrand.length) throw new ApiError(400, "brand not found");
  res.status(200).json(new ApiResponse(200, { brand: existingBrand }));
});
