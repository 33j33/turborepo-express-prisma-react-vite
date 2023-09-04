import express from "express";
import { createTrackingPlan, getTrackingPlan, getTrackingPlans } from "../controllers/trackingplan.controller";

const router = express.Router();

router.post("/", createTrackingPlan);
router.get("/:id", getTrackingPlan)
router.get("/", getTrackingPlans)

export const trackingPlanRouter = router;