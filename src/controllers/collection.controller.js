import { CollectionModal } from "../models/collection.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";

export const getCollections = asyncHandler(async (req, res, next) => {
  // const collection = await CollectionModal.find({}, {}, { sort: { order: 1 } });
  const collection = await CollectionModal.aggregate([
    {
      $project: {
        _id: 0, // Exclude _id field if not needed
        label: "$name", // Rename "name" field to "label"
        value: "$handle", // Rename "handle" field to "value"
      },
    },
  ]);
  res.status(200).json(new ApiResponse(200, { collection }));
});

export const getACollection = asyncHandler(async (req, res, next) => {
  const { collection } = req.params;

  const existingCollection = await CollectionModal.find({
    handle: {
      $regex: new RegExp(`^${collection}$`, "i"),
    },
  });

  if (!existingCollection.length)
    throw new ApiError(400, "Collection not found");
  res
    .status(200)
    .json(new ApiResponse(200, { collection: existingCollection }));
});
