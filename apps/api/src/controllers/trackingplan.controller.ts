import { prismaClient } from "../prisma/client";
import { NextFunction, Request, Response } from "express";
import { BaseQueryParams, TrackingPlanWithEvents, Uuid } from "types";
import { AppError } from "../helpers/error.helper";

export const createTrackingPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = TrackingPlanWithEvents.safeParse(req.body);
    if (!result.success) {
      throw new AppError(400, "Invalid Body Payload", result.error);
    }
    const { name, events } = result.data;
    const plan = await prismaClient.trackingPlan.create({
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
    res.status(201).json(plan);
  } catch (error: any) {
    next(error);
  }
};

export const getTrackingPlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = Uuid.safeParse(id);
    if (!result.success) throw new AppError(400, "Invalid Id", result.error);
    const plan = await prismaClient.trackingPlan.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        events: true,
      },
    });
    res.status(200).json(plan);
  } catch (err) {
    next(err);
  }
};

export const getTrackingPlans = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = BaseQueryParams.safeParse(req.params);
    if (!result.success) throw new AppError(400, "Invalid Id", result.error);
    const plans = await prismaClient.trackingPlan.findMany({
      skip: result.data.offset || 0,
      take: result.data.limit || 50,
    });
    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};
