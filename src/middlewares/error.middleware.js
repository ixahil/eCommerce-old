import mongoose from "mongoose";
import { ApiError } from "../utils/index.js";
import { getConfig } from "../config/index.js";

const appEnv = getConfig.get("nodeENV");

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;

    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);

    // Mongoose Duplicate Field Error
    if (err.code === 11000) {
      const message = `${Object.keys(err.keyValue)}: ${Object.values(
        err.keyValue
      )} is already exist `;
      error = new ApiError(400, message, error?.errors || [], err.stack);
    }
  }

  const response = {
    ...error,
    message: error.message,
    ...(appEnv === "dev" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);

  // error.statusCode = error.statusCode || 500
  // error.message = error.message || 'Internal Server Error'

  // res.status(error.status).json({
  //     message: error.message
  // })
};

export { errorHandler };
