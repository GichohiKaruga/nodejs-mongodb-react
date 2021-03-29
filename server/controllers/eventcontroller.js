import express from "express";
import mongoose from "mongoose";
import moment from "moment";

import Event from "../models/event.js";
import response from "../models/eventresponse.js";

const router = express.Router();

export const getEvents = async (req, res) => {
  try {
    let eventsArray = [];
    const events = await Event.find();

    for (const e of events) {
      const eventDate = e.eventDate;
      const date = eventDate.toString();
      const eventResponse = response(
        e.title,
        e.description,
        date,
        e.country,
        e.city
      );

      eventsArray.push(eventResponse);
    }

    res.status(200).json(eventsArray);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    const eventDate = event.eventDate;
    const date = eventDate.toString();

    const eventResponse = response(
      event.title,
      event.description,
      date,
      event.country,
      event.city,
      event.address
    );

    res.status(200).json(eventResponse);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  const { title, description, imageFile, eventDate, country, city } = req.body;

  const momentDate = moment(eventDate);
  const edate = momentDate.toDate();
  const newEvent = new Event({
    title,
    description,
    imageFile,
    eventDate: edate,
    country,
    city,
  });

  try {
    await newEvent.save();

    const eventResponse = response(
      title,
      description,
      eventDate,
      country,
      city
    );

    res.status(201).json(eventResponse);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, imageFile, eventDate, country, city } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No event with id: ${id}`);

  const momentDate = moment(eventDate);
  const edate = momentDate.toDate();

  const updatedEvent = {
    title,
    description,
    imageFile,
    eventDate: edate,
    country,
    city,
    _id: id,
  };

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
