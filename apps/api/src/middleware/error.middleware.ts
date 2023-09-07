import { NextFunction, Request, Response } from "express";
import { AppError } from "../helpers/error.helper";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorResponder = (error: Error, request: Request, response: Response, next: NextFunction) => {
  let status: number = 500;
  let res: Record<string, any> = { message: "Something went wrong" };
  if (error instanceof AppError) {
    res = { ...error.additionalDetails, message: error.message };
    status = error.statusCode;
  } else if (error instanceof PrismaClientKnownRequestError) {
    res = { message: error.meta, code: error.code };
    status = 400;
  }
  response.status(status).json({ error: res });
};
