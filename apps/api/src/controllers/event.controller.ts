import { prismaClient } from "../prisma/client";
import { NextFunction, Request, Response } from "express";
import { Event } from "types";
import { AppError } from "../helpers/error.helper";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = Event.safeParse(req.body);
    if (!result.success) {
      throw new AppError(400, "Invalid Body Payload", result.error);
    }
    const { trackingPlanId, ...eventReq } = result.data;
    const event = await prismaClient.event.create({
      data: {
        ...eventReq,
        trackingPlans: { connect: [{ id: result.data.trackingPlanId }] },
      },
    });
    res.status(201).json(event);
  } catch (error: any) {
    next(error);
  }
};
