import mongoose from 'mongoose';
import { TOPICS, SAFE_TIMES, LANGUAGES, CALLBACK_STATUSES } from '../constants.js';

// alias, phone and message are stored encrypted.
const callbackSchema = new mongoose.Schema(
  {
    alias: String,
    phone: { type: String, required: true },
    topic: { type: String, enum: TOPICS, default: 'other' },
    safeTime: { type: String, enum: SAFE_TIMES, default: 'anytime' },
    language: { type: String, enum: LANGUAGES, default: 'bn' },
    voicemailOk: { type: Boolean, default: false },
    message: String,
    status: { type: String, enum: CALLBACK_STATUSES, default: 'new' },
  },
  { timestamps: true },
);

export default mongoose.model('CallbackRequest', callbackSchema);
