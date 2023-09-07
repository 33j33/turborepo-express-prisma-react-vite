import express from "express";
import { createEvent, getEvent, getEvents, updateEvent } from "../controllers/event.controller";

const router = express.Router();

router.post("/", createEvent);
router.get("/:id", getEvent);
router.get("/", getEvents);
router.patch("/:id", updateEvent);

export const eventRouter = router;
