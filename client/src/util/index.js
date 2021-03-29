import axios from "axios";

const url = "http://localhost:5000/events";

export const fetchEvents = () => axios.get(url);
export const fetchEvent = (id) => axios.get(`${url}/${id}`);

export const createEvent = (newEvent) => axios.post(url, newEvent);
export const updateEvent = (id, updatedEvent) =>
  axios.patch(`${url}/${id}`, updatedEvent);
export const deleteEvent = (id) => axios.delete(`${url}/${id}`);
