import { Request, Response, NextFunction } from "express";
import { errors } from "@vinejs/vine";
import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else if (err instanceof errors.E_VALIDATION_ERROR) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.messages,
    });
  } else {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
    });
  }
};
