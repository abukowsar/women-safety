import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Volunteer from '../models/Volunteer.js';
import { protect, requireRole } from '../middleware/auth.js';
import { str, oneOf, phone, email, bool, list, firstError } from '../utils/validate.js';
import { VOLUNTEER_SKILLS, AVAILABILITY, LANGUAGES, VOLUNTEER_STATUSES } from '../constants.js';

const router = Router();
const submitLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });

router.post('/', submitLimiter, async (req, res) => {
  const b = req.body || {};
  const skills = list(b.skills);
  const languages = list(b.languages);

  const error = firstError({
    name: str(b.name, { required: true, min: 2, max: 100 }),
    email: email(b.email, { required: true }),
    phone: phone(b.phone),
    district: str(b.district, { max: 60 }),
    availability: oneOf(b.availability, AVAILABILITY),
    motivation: str(b.motivation, { max: 1500 }),
    skills: skills.every((s) => VOLUNTEER_SKILLS.includes(s)) ? null : 'contains an invalid option',
    languages: languages.every((l) => LANGUAGES.includes(l)) ? null : 'contains an invalid option',
    consent: bool(b.consent) ? null : 'must be accepted',
  });
  if (error) return res.status(400).json({ success: false, error });

  const existing = await Volunteer.findOne({ email: b.email.toLowerCase().trim(), status: { $ne: 'declined' } });
  if (existing) return res.status(409).json({ success: false, error: 'An application with this email already exists' });

  await Volunteer.create({
    name: b.name.trim(),
    email: b.email.trim(),
    phone: b.phone?.trim(),
    district: b.district?.trim(),
    skills,
    languages,
    availability: b.availability || 'flexible',
    motivation: b.motivation?.trim(),
  });
  res.status(201).json({ success: true });
});

router.get('/', protect, async (req, res) => {
  const items = await Volunteer.find().sort({ createdAt: -1 }).limit(500);
  res.json({ success: true, data: items });
});

router.put('/:id/status', protect, requireRole('admin', 'ngo_support'), async (req, res) => {
  const error = oneOf(req.body?.status, VOLUNTEER_STATUSES, { required: true });
  if (error) return res.status(400).json({ success: false, error: `status ${error}` });
  const item = await Volunteer.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }).catch(() => null);
  if (!item) return res.status(404).json({ success: false, error: 'Application not found' });
  res.json({ success: true, data: item });
});

router.delete('/:id', protect, requireRole('admin'), async (req, res) => {
  const item = await Volunteer.findByIdAndDelete(req.params.id).catch(() => null);
  if (!item) return res.status(404).json({ success: false, error: 'Application not found' });
  res.json({ success: true });
});

export default router;
