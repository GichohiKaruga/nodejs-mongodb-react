import mongoose from "mongoose";

const EventSchema = mongoose.Schema({
  title: String,
  description: String,
  creator: String,
  eventDate: Date,
  imageFile: String,
  country: String,
  city: String,
  address: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Event = mongoose.model("Events", EventSchema);

export default Event;
