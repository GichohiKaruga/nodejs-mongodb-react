import express from "express";

import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventcontroller.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
