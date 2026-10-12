import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import CallbackRequest from '../models/CallbackRequest.js';
import { protect, requireRole } from '../middleware/auth.js';
import { encrypt, decrypt } from '../utils/crypto.js';
import { str, oneOf, phone, bool, firstError } from '../utils/validate.js';
import { TOPICS, SAFE_TIMES, LANGUAGES, CALLBACK_STATUSES } from '../constants.js';

const router = Router();
const submitLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

const toStaffView = (c) => ({
  _id: c._id,
  alias: decrypt(c.alias),
  phone: decrypt(c.phone),
  topic: c.topic,
  safeTime: c.safeTime,
  language: c.language,
  voicemailOk: c.voicemailOk,
  message: decrypt(c.message),
  status: c.status,
  createdAt: c.createdAt,
});

router.post('/', submitLimiter, async (req, res) => {
  const b = req.body || {};
  const error = firstError({
    alias: str(b.alias, { max: 60 }),
    phone: phone(b.phone, { required: true }),
    topic: oneOf(b.topic, TOPICS),
    safeTime: oneOf(b.safeTime, SAFE_TIMES),
    language: oneOf(b.language, LANGUAGES),
    message: str(b.message, { max: 1000 }),
  });
  if (error) return res.status(400).json({ success: false, error });

  await CallbackRequest.create({
    alias: encrypt(b.alias?.trim()),
    phone: encrypt(b.phone.trim()),
    topic: b.topic || 'other',
    safeTime: b.safeTime || 'anytime',
    language: b.language || 'bn',
    voicemailOk: bool(b.voicemailOk),
    message: encrypt(b.message?.trim()),
  });
  res.status(201).json({ success: true });
});

router.get('/', protect, async (req, res) => {
  const items = await CallbackRequest.find().sort({ createdAt: -1 }).limit(500);
  res.json({ success: true, data: items.map(toStaffView) });
});

router.put('/:id/status', protect, async (req, res) => {
  const error = oneOf(req.body?.status, CALLBACK_STATUSES, { required: true });
  if (error) return res.status(400).json({ success: false, error: `status ${error}` });
  const item = await CallbackRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).catch(() => null);
  if (!item) return res.status(404).json({ success: false, error: 'Request not found' });
  res.json({ success: true, data: toStaffView(item) });
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  const item = await CallbackRequest.findByIdAndDelete(req.params.id).catch(() => null);
  if (!item) return res.status(404).json({ success: false, error: 'Request not found' });
  res.json({ success: true });
});

export default router;
