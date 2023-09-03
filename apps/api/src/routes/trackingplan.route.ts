import express from "express";
import { createTrackingPlan } from "../controllers/trackingplan.controller";

const router = express.Router();

router.post("/", createTrackingPlan);

export const trackingPlanRouter = router;