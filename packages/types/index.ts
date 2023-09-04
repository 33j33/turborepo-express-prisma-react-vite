import { z } from "zod";

export type { AnyZodObject } from "zod";
export const Uuid = z.string().uuid();

export const Event = z.object({
  name: z.string(),
  description: z.string(),
  rules: z.object({
    $schema: z.string().url(),
    type: z.string(),
    properties: z.object({
      type: z.string(),
      properties: z.record(z.string(), z.object({ type: z.array(z.string()) })),
      required: z.array(z.string()),
    }),
  }),
});

export const EventWithTrackingPlanIds = Event.extend({
  trackingPlanIds: z.array(Uuid),
});

export const TrackingPlan = z.object({ name: z.string() });

export const TrackingPlanWithEvents = TrackingPlan.extend({
  events: z.array(Event),
});

export const TrackingPlanWithEventIds = TrackingPlan.extend({
  eventIds: z.array(Uuid),
});

export const BaseQueryParams = z
  .object({
    offset: z.string(),
    limit: z.string(),
  })
  .partial();

export type EventType = z.infer<typeof Event>;
export type TrackingPlanType = z.infer<typeof TrackingPlan>;
export type TrackingPlanWithEventsType = z.infer<typeof TrackingPlanWithEvents>;
