import { EcomProfileModel } from "../models/index.js";
import { delay } from "../utils/helpers.js";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  moveImage,
} from "../utils/index.js";

export const getProfile = asyncHandler(async (req, res, next) => {
  const profile = await EcomProfileModel.findOne({ owner: req.user._id });

  res.status(200).json(new ApiResponse(200, { profile }));
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { firstName, lastName } = req.body;

  const { avatar } = await moveImage(req, "user/images", req.user.username);

  req.body.avatar = avatar ? avatar[0] : {};

  let profile = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    avatar: req.body.avatar,
  };
  console.log(profile);

  profile = await EcomProfileModel.findByIdAndUpdate(req.params.id, profile, {
    new: true,
  });
  res
    .status(200)
    .json(new ApiResponse(200, { profile }, "Profile Updated Successfully!"));
});
