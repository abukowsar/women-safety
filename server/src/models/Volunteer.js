import mongoose from 'mongoose';
import { VOLUNTEER_SKILLS, AVAILABILITY, LANGUAGES, VOLUNTEER_STATUSES } from '../constants.js';

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    district: { type: String, trim: true, maxlength: 60 },
    skills: [{ type: String, enum: VOLUNTEER_SKILLS }],
    languages: [{ type: String, enum: LANGUAGES }],
    availability: { type: String, enum: AVAILABILITY, default: 'flexible' },
    motivation: { type: String, maxlength: 1500 },
    status: { type: String, enum: VOLUNTEER_STATUSES, default: 'new' },
  },
  { timestamps: true },
);

export default mongoose.model('Volunteer', volunteerSchema);
