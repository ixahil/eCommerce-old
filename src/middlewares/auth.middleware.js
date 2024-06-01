import { getConfig } from "../config/index.js";
import { UserModel } from "../models/index.js";
import { ApiError, asyncHandler } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const authenticate = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized Request!");
  }
  try {
    const decoded = jwt.verify(token, getConfig.get("accessTokenSecret"));
    const user = await UserModel.findById(decoded._id)
      .select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpires"
      )
      .populate("profile");

    let { profile, ...restUser } = user._doc;

    if (!user) {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      throw new ApiError(401, "Invalid Access Token!");
    }
    req.user = restUser;
    req.profile = profile;
    next();
  } catch (error) {
    // Client should make a request to /api/v1/users/refresh-token if they have refreshToken present in their cookie
    // Then they will get a new access token which will allow them to refresh the access token without logging out the user
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export const authorizePermissions = (roles = []) =>
  asyncHandler(async (req, res, next) => {
    if (!req.user?._id) throw new ApiError(401, "Unauthorized Request!");
    if (roles.includes(req.user?.role)) {
      next();
    } else {
      throw new ApiError(401, "You are not allowed to access this resource");
    }
  });
