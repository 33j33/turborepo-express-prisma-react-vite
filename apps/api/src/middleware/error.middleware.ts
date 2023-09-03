import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers/error.helper";

export const errorResponder = (
    error: AppError,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const status = error.statusCode || 500;
    response.status(status).json({ error: error.message });
  };