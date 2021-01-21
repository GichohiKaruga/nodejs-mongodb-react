import express from "express";
import mongoose from "mongoose";

import Event from "../models/event.js";

const router = express.Router();

export const getEvents = async (req, res) => {
  try {
    const event = await Event.find();

    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const { title, description, imageFile, eventDate } = req.body;

  const newEvent = new Event({
    title,
    description,
    imageFile,
    eventDate,
  });

  try {
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageFile, eventDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No event with id: ${id}`);

  const updatedEvent = { title, description, imageFile, eventDate, _id: id };

  await Event.findByIdAndUpdate(id, updatedEvent, { new: true });

  res.json(updatedEvent);
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No event with id: ${id}`);

  await Event.findByIdAndRemove(id);

  res.json({ message: "Event deleted successfully." });
};

export default router;
