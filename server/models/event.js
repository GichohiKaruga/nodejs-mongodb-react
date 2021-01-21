import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  title: String,
  description: String,
  eventDate: Date,
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Event = mongoose.model("Event", EventSchema);

export default Event;
