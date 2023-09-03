import { prismaClient } from "../prisma/client";
import { NextFunction, Request, Response } from "express";
import { TrackingPlanWithEvents } from "types";
import { AppError } from "../helpers/error.helper";

export const createTrackingPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = TrackingPlanWithEvents.safeParse(req.body);
    if (!result.success) {
      throw new AppError(400, result.error.message);
    }
    const { name, events } = result.data;
    const product = await prismaClient.trackingPlan.create({
      data: {
        name,
        events: {
          create: events,
        },
      },
      include: {
        events: true,
      },
    });
    res.status(201).json(product);
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(500, error?.message));
  }
};
