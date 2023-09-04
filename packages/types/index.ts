import { z } from "zod";

export type { AnyZodObject } from "zod";
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

export type EventType = z.infer<typeof Event>;

export const TrackingPlan = z.object({ name: z.string() });
export type TrackingPlanType = z.infer<typeof TrackingPlan>;

export const TrackingPlanWithEvents = TrackingPlan.extend({
  events: z.array(Event),
});
export type TrackingPlanWithEventsType = z.infer<typeof TrackingPlanWithEvents>;

export const Uuid = z.string().uuid();

export const BaseQueryParams = z
  .object({
    offset: z.number(),
    limit: z.number(),
  })
  .partial();
