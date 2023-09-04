import express from "express";
import {
  createTrackingPlan,
  getTrackingPlan,
  getTrackingPlans,
  updateTrackingPlan,
} from "../controllers/trackingplan.controller";

const router = express.Router();

router.post("/", createTrackingPlan);
router.get("/:id", getTrackingPlan);
router.get("/", getTrackingPlans);
router.patch("/:id", updateTrackingPlan);

export const trackingPlanRouter = router;
