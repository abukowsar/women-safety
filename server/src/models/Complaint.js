import mongoose from 'mongoose';
import { COMPLAINT_TYPES, COMPLAINT_STATUSES, SAFE_TIMES } from '../constants.js';

// description, victimName, victimPhone and incidentLocation are stored encrypted (see utils/crypto.js).
const complaintSchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true, index: true },
    type: { type: String, enum: COMPLAINT_TYPES, required: true },
    description: { type: String, required: true },
    incidentDate: Date,
    incidentLocation: String,
    district: { type: String, maxlength: 60 },
    isAnonymous: { type: Boolean, default: false },
    victimName: String,
    victimPhone: String,
    canContact: { type: Boolean, default: false },
    safeTime: { type: String, enum: SAFE_TIMES },
    inDanger: { type: Boolean, default: false },
    evidence: [
      {
        file: String, // encrypted file name on disk
        originalName: String,
        mimeType: String,
        size: Number,
      },
    ],
    status: { type: String, enum: COMPLAINT_STATUSES, default: 'pending' },
    statusHistory: [{ status: String, at: { type: Date, default: Date.now }, by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // Staff-only case notes; text is encrypted.
    notes: [{ text: String, by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, byName: String, at: { type: Date, default: Date.now } }],
  },
  { timestamps: true },
);

export default mongoose.model('Complaint', complaintSchema);
