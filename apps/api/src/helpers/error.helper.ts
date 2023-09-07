import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode: number;
  additionalDetails: Record<string, any>;

  constructor(statusCode: number, message: string, additionalDetails: Record<string, any>) {
    super(message);
    this.name = Error.name;
    this.message = message;
    this.statusCode = statusCode;
    this.additionalDetails = additionalDetails;
    Error.captureStackTrace(this);
  }
}
