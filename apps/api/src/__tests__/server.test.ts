import supertest from "supertest";
import { createServer } from "../server";

describe("server", () => {
  it("health check returns 200", async () => {
    await supertest(createServer())
      .get("/healthz")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });
});

describe("Event Routes", () => {
  let createdEventId: string = "d1f87429-3a4d-4fc5-8f2b-0885c6844a75";

  // Test for creating an event
  it("should create an event", async () => {
    const newEvent = {
      name: "Order Viewed - 3",
      description: "Lorem iasfaspsumWhose order viewed",
      rules: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
          type: "object",
          properties: {
            product: {
              type: ["string"],
            },
            price: {
              type: ["number"],
            },
            currency: {
              type: ["string"],
            },
          },
          required: ["product", "price", "currency"],
        },
      },
      trackingPlanIds: [],
    };

    await supertest(createServer())
      .post("/events")
      .send(newEvent)
      .expect(201)
      .then((res) => {
        createdEventId = res.body.id; // Store the created event ID for later tests
        expect(res.body.name).toBe(newEvent.name);
        expect(res.body.description).toBe(newEvent.description);
      });
  });

  // Test for getting a single event
  it("should get a single event by ID", async () => {
    if (!createdEventId) {
      throw new Error("No event ID available for testing");
    }

    await supertest(createServer())
      .get(`/events/${createdEventId}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(createdEventId);
      });
  });

  // Test for getting a list of events
  it("should get a list of events", async () => {
    await supertest(createServer())
      .get("/events")
      .expect(200)
      .then((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      })
      .catch((err) => console.log(err));
  });

  // Test for updating an event
  it("should update an event by ID", async () => {
    if (!createdEventId) {
      throw new Error("No event ID available for testing");
    }

    const updatedEvent = {
      name: "Updated Event",
      description: "Lorem iasfaspsumWhose order viewed",
      rules: {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
          type: "object",
          properties: {
            product: {
              type: ["string"],
            },
            price: {
              type: ["number"],
            },
            currency: {
              type: ["string"],
            },
          },
          required: ["product", "price", "currency"],
        },
      },
      trackingPlanIds: [],
    };

    await supertest(createServer())
      .patch(`/events/${createdEventId}`)
      .send(updatedEvent)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toBe(updatedEvent.name);
      });
  });
});
