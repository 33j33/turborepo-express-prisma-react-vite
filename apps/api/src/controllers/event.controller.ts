import { prismaClient } from "../prisma/client";
import { NextFunction, Request, Response } from "express";
import { BaseQueryParams, Event, EventWithTrackingPlanIds, Uuid } from "types";
import { AppError } from "../helpers/error.helper";

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = EventWithTrackingPlanIds.safeParse(req.body);
    if (!result.success) {
      throw new AppError(400, "Invalid Request Body Payload", result.error);
    }
    const { trackingPlanIds, ...eventReq } = result.data;
    const event = await prismaClient.event.create({
      data: {
        ...eventReq,
        trackingPlans: { connect: trackingPlanIds.map((id) => ({ id })) },
      },
      include: {
        trackingPlans: true
      }
    });
    res.status(201).json(event);
  } catch (error: any) {
    next(error);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = Uuid.safeParse(req.params.id);
    if (!result.success) throw new AppError(400, "Invalid Request Body Payload", result.error)
    const eventId = result.data;
    const event = await prismaClient.event.findUniqueOrThrow({
      where: {
        id: eventId
      },
      include: {
        trackingPlans: true
      }
    })
    res.status(200).json(event)
  } catch(err){
    next(err)
  }
}

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = BaseQueryParams.safeParse(req.query);
    if (!result.success) throw new AppError(400, "Invalid Query Params", result.error);
    const events = await prismaClient.event.findMany({
      skip: Number(result.data.offset) ?? 0,
      take: Number(result.data.limit) ?? 50,
    });
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const resultId = Uuid.safeParse(req.params.id);
    if (!resultId.success)
      throw new AppError(400, "Invalid Id", resultId.error);
    const eventId = req.params.id;
    const resultBody = EventWithTrackingPlanIds.safeParse(req.body);
    if (!resultBody.success)
      throw new AppError(400, "Invalid Request Body Payload", resultBody.error);
    const { trackingPlanIds, ...eventReq } = resultBody.data;
    const event = await prismaClient.event.update({
      where: { id: eventId },
      data: {
        ...eventReq,
        trackingPlans: {
          set: trackingPlanIds.map((id) => ({ id })),
        },
      },
      include: {
        trackingPlans: true
      }
    });
    res.status(200).json(event)
  } catch (err) {
    next(err);
  }
};
