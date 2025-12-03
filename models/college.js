import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const collegeSchema = new Schema({
  name: { type: String, required: true, unique: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  rating: { type: Number, required: true },
}, {
  timestamps: true
});

collegeSchema.plugin(normalize);

export const CollegeModel = model('College', collegeSchema);