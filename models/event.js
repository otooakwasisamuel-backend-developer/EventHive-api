import { Schema, model, Types } from "mongoose";
import normalize from "normalize-mongoose";

const eventSchema = new Schema({
  user: { type: Types.ObjectId, required: true, ref: 'User' },
  college: { type: Types.ObjectId, required: true, ref: 'College' },
  title: { type: String, required: true, unique: true },
  venue: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String, required: true }],
}, {
  timestamps: true
});

eventSchema.plugin(normalize);

export const EventModel = model('Event', eventSchema);