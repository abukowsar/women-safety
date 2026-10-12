import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import Complaint from '../models/Complaint.js';
import User from '../models/User.js';
import { protect, requireRole } from '../middleware/auth.js';
import { evidenceUpload } from '../middleware/upload.js';
import { encrypt, decrypt, encryptBuffer, decryptBuffer, trackingId } from '../utils/crypto.js';
import { str, oneOf, phone, bool, firstError } from '../utils/validate.js';
import { COMPLAINT_TYPES, COMPLAINT_STATUSES, SAFE_TIMES } from '../constants.js';

const router = Router();
export const EVIDENCE_DIR = path.resolve('uploads', 'evidence');

const submitLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

const toStaffView = (c) => ({
  _id: c._id,
  trackingId: c.trackingId,
  type: c.type,
  description: decrypt(c.description),
  incidentDate: c.incidentDate,
  incidentLocation: decrypt(c.incidentLocation),
  district: c.district,
  isAnonymous: c.isAnonymous,
  victimName: decrypt(c.victimName),
  victimPhone: decrypt(c.victimPhone),
  canContact: c.canContact,
  safeTime: c.safeTime,
  inDanger: c.inDanger,
  // Fetched with the staff token through the evidence route below; never public.
  evidence: c.evidence.map((_, i) => `/complaints/${c._id}/evidence/${i}`),
  evidenceMeta: c.evidence.map((e) => ({ name: e.originalName, type: e.mimeType, size: e.size })),
  status: c.status,
  statusHistory: c.statusHistory,
  assignedTo: c.assignedTo,
  notes: (c.notes || []).map((n) => ({ _id: n._id, text: decrypt(n.text), byName: n.byName, at: n.at })),
  createdAt: c.createdAt,
  updatedAt: c.updatedAt,
});

// Public: submit a report (multipart, optional evidence files).
router.post('/', submitLimiter, evidenceUpload, async (req, res) => {
  const b = req.body || {};
  const isAnonymous = bool(b.isAnonymous);
  const canContact = !isAnonymous && bool(b.canContact);

  const error = firstError({
    type: oneOf(b.type, COMPLAINT_TYPES, { required: true }),
    description: str(b.description, { required: true, min: 10, max: 5000 }),
    incidentLocation: str(b.incidentLocation, { max: 300 }),
    district: str(b.district, { max: 60 }),
    victimName: isAnonymous ? null : str(b.victimName, { max: 100 }),
    victimPhone: isAnonymous ? null : phone(b.victimPhone, { required: canContact }),
    safeTime: oneOf(b.safeTime, SAFE_TIMES),
  });
  if (error) return res.status(400).json({ success: false, error });

  let incidentDate;
  if (b.incidentDate) {
    incidentDate = new Date(b.incidentDate);
    if (Number.isNaN(incidentDate.getTime()) || incidentDate > new Date()) {
      return res.status(400).json({ success: false, error: 'incidentDate is not a valid date' });
    }
  }

  await fs.mkdir(EVIDENCE_DIR, { recursive: true });
  const evidence = [];
  for (const file of req.files || []) {
    const name = `${crypto.randomUUID()}.bin`;
    await fs.writeFile(path.join(EVIDENCE_DIR, name), encryptBuffer(file.buffer));
    evidence.push({ file: name, originalName: file.originalname.slice(0, 200), mimeType: file.mimetype, size: file.size });
  }

  const complaint = await Complaint.create({
    trackingId: trackingId(),
    type: b.type,
    description: encrypt(b.description.trim()),
    incidentDate,
    incidentLocation: encrypt(b.incidentLocation?.trim()),
    district: b.district?.trim(),
    isAnonymous,
    victimName: isAnonymous ? undefined : encrypt(b.victimName?.trim()),
    victimPhone: isAnonymous ? undefined : encrypt(b.victimPhone?.trim()),
    canContact,
    safeTime: canContact ? b.safeTime : undefined,
    inDanger: bool(b.inDanger),
    evidence,
    statusHistory: [{ status: 'pending' }],
  });

  res.status(201).json({ success: true, data: { trackingId: complaint.trackingId } });
});

// Public: check status by tracking id. Returns no personal details.
router.get('/track/:trackingId', async (req, res) => {
  const id = String(req.params.trackingId).trim().toUpperCase();
  if (!/^NP-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(id)) {
    return res.status(400).json({ success: false, error: 'Tracking ID format is NP-XXXX-XXXX' });
  }
  const c = await Complaint.findOne({ trackingId: id });
  if (!c) return res.status(404).json({ success: false, error: 'No report found with this tracking ID' });
  res.json({
    success: true,
    data: {
      trackingId: c.trackingId,
      type: c.type,
      status: c.status,
      statusHistory: c.statusHistory.map((h) => ({ status: h.status, at: h.at })),
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    },
  });
});

// Staff only below.
router.get('/', protect, async (req, res) => {
  const filter = {};
  if (req.query.status && COMPLAINT_STATUSES.includes(req.query.status)) filter.status = req.query.status;
  const complaints = await Complaint.find(filter).sort({ inDanger: -1, createdAt: -1 }).limit(500);
  res.json({ success: true, data: complaints.map(toStaffView) });
});

router.get('/:id/evidence/:index', protect, async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).catch(() => null);
  const item = complaint?.evidence[Number(req.params.index)];
  if (!item) return res.status(404).json({ success: false, error: 'Evidence not found' });

  const data = decryptBuffer(await fs.readFile(path.join(EVIDENCE_DIR, path.basename(item.file))));
  res.set({
    'Content-Type': item.mimeType,
    'Content-Disposition': `inline; filename="evidence-${req.params.index}"`,
    'Cache-Control': 'no-store',
  });
  res.send(data);
});

router.put('/:id/status', protect, async (req, res) => {
  const { status } = req.body || {};
  const error = oneOf(status, COMPLAINT_STATUSES, { required: true });
  if (error) return res.status(400).json({ success: false, error: `status ${error}` });

  const complaint = await Complaint.findById(req.params.id).catch(() => null);
  if (!complaint) return res.status(404).json({ success: false, error: 'Report not found' });
  complaint.status = status;
  complaint.statusHistory.push({ status, by: req.user._id });
  await complaint.save();
  res.json({ success: true, data: toStaffView(complaint) });
});

router.put('/:id/assign', protect, requireRole('admin', 'ngo_support'), async (req, res) => {
  // Empty userId unassigns.
  let assignedTo = null;
  if (req.body?.userId) {
    const user = await User.findOne({ _id: req.body.userId, active: true }).catch(() => null);
    if (!user) return res.status(400).json({ success: false, error: 'User not found' });
    assignedTo = user._id;
  }
  const complaint = await Complaint.findByIdAndUpdate(req.params.id, { assignedTo }, { new: true }).catch(() => null);
  if (!complaint) return res.status(404).json({ success: false, error: 'Report not found' });
  res.json({ success: true, data: toStaffView(complaint) });
});

router.post('/:id/notes', protect, async (req, res) => {
  const error = str(req.body?.text, { required: true, max: 3000 });
  if (error) return res.status(400).json({ success: false, error: `text ${error}` });
  const complaint = await Complaint.findById(req.params.id).catch(() => null);
  if (!complaint) return res.status(404).json({ success: false, error: 'Report not found' });
  complaint.notes.push({ text: encrypt(req.body.text.trim()), by: req.user._id, byName: req.user.name });
  await complaint.save();
  res.status(201).json({ success: true, data: toStaffView(complaint) });
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  const complaint = await Complaint.findById(req.params.id).catch(() => null);
  if (!complaint) return res.status(404).json({ success: false, error: 'Report not found' });
  await Promise.all(complaint.evidence.map((e) => fs.rm(path.join(EVIDENCE_DIR, path.basename(e.file)), { force: true })));
  await complaint.deleteOne();
  res.json({ success: true });
});

export default router;
