import express from "express";
import { createEvent } from "../controllers/event.controller";

const router = express.Router();

router.post("/", createEvent);

export const eventRouter = router;