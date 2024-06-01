import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { ApiError } from "../utils/index.js";
import jwt from "jsonwebtoken";
import { getConfig } from "../config/index.js";
import crypto from "crypto";
import { CartModel, EcomProfileModel } from "./index.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: [true, "Username should be unique"],
      lowercase: true,
      trim: true,
      index: {
        unique: true,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: {
        unique: true,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["ADMIN", "USER", "SUPERADMIN"],
      default: "USER",
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "EcomProfile",
    },
    userStatus: {
      type: String,
      required: [true, "Email is required"],
      enum: ["ACTIVE", "INACTIVE", "DELETED", "SUSPENDED"],
      default: "ACTIVE",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpires: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    getConfig.get("accessTokenSecret"),
    { expiresIn: getConfig.get("accessTokenExpiresIn") }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    getConfig.get("refreshTokenSecret"),
    { expiresIn: getConfig.get("refreshTokenExpiresIn") }
  );
};

// Method responsible for generating tokens for email verification, password reset etc.

UserSchema.methods.generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const expiry = 1;
  const tokenExpiry = Date.now() + expiry * 60 * 60 * 1000;

  return { unHashedToken, hashedToken, tokenExpiry };
};

UserSchema.statics.loginUser = async function (userdata) {
  const existingUser = await this.findOne({
    username: userdata.username,
  }).populate("profile");
  if (!existingUser) throw new ApiError(400, "Invalid Credentials");
  const isMatch = await existingUser.comparePassword(userdata.password);
  if (!isMatch) throw new ApiError(400, "Invalid Credentials");
  return existingUser;
};

UserSchema.post("save", async function (user, next) {
  let ecommProfile = await EcomProfileModel.findOne({ owner: user._id });
  const cart = await CartModel.findOne({ owner: user._id });

  if (!ecommProfile) await EcomProfileModel.create({ owner: user._id });

  if (!cart) await CartModel.create({ owner: user._id });
});

// Define a method to exclude sensitive fields from the returned object

export const UserModel = model("User", UserSchema);
