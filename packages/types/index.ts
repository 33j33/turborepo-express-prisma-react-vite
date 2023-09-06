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

export const EventResponse = Event.extend({
  id: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export const EventWithTrackingPlanIds = Event.extend({
  trackingPlanIds: z.array(Uuid),
});


export const TrackingPlan = z.object({ name: z.string() });
export const TrackingPlanResponse = TrackingPlan.extend({
  id: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const EventWithTrackinPlansResponse = EventResponse.extend({
  trackingPlans: z.array(TrackingPlanResponse)
})

export const TrackingPlanWithEvents = TrackingPlan.extend({
  events: z.array(Event),
});
export const TrackingPlanWithEventsResponse = TrackingPlanResponse.extend({
  events: z.array(EventResponse)
})

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
export type EventResponseType = z.infer<typeof EventResponse>;
export type EventWithTrackinPlansResponseType = z.infer<typeof EventWithTrackinPlansResponse>
export type TrackingPlanType = z.infer<typeof TrackingPlan>;
export type TrackingPlanResponseType = z.infer<typeof TrackingPlanResponse>;
export type TrackingPlanWithEventsType = z.infer<typeof TrackingPlanWithEvents>;
export type TrackingPlanWithEventsResponseType = z.infer<typeof TrackingPlanWithEventsResponse>

export const ROUTES = {
  PLANS: 'trackingplans',
  EVENTS: 'events'
} as const

export type RoutesType  = typeof ROUTES[keyof typeof ROUTES]