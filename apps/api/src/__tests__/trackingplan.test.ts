import supertest from "supertest";
import { createServer } from "../server";

describe("Tracking Plan Routes", () => {
  let createdTrackingPlanId = "5f96ad4a-7fd5-4465-97eb-c8470288a1c9";

  // Test for creating a tracking plan
  it("should create a tracking plan", async () => {
    const newTrackingPlan = {
      name: "Tracking Plan 3",
      events: [
        {
          name: "Order Viewed 3",
          description: "Whose order viewed",
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
        },
      ],
    };

    await supertest(createServer())
      .post("/trackingplans")
      .send(newTrackingPlan)
      .expect(201)
      .then((res) => {
        createdTrackingPlanId = res.body.id; // Store the created tracking plan ID for later tests
        expect(res.body.name).toBe(newTrackingPlan.name);
      });
  });

  // Test for getting a single tracking plan
  it("should get a single tracking plan by ID", async () => {
    if (!createdTrackingPlanId) {
      throw new Error("No tracking plan ID available for testing");
    }

    await supertest(createServer())
      .get(`/trackingplans/${createdTrackingPlanId}`)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(createdTrackingPlanId);
      });
  });

  // Test for getting a list of tracking plans
  it("should get a list of tracking plans", async () => {
    await supertest(createServer())
      .get("/trackingplans")
      .expect(200)
      .then((res) => {
        // Ensure that the response is an array of tracking plans
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  // Test for updating a tracking plan
  it("should update a tracking plan by ID", async () => {
    if (!createdTrackingPlanId) {
      throw new Error("No tracking plan ID available for testing");
    }

    const updatedTrackingPlan = {
      name: "Updated Tracking Plan 2",
      events: [
        {
          name: "Update Event 1",
          description: "Whose order viewed",
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
        },
      ],
    };

    await supertest(createServer())
      .patch(`/trackingplans/${createdTrackingPlanId}`)
      .send(updatedTrackingPlan)
      .expect(200)
      .then((res) => {
        expect(res.body.name).toBe(updatedTrackingPlan.name);
      });
  });
});
