import { Router } from 'express';
import crypto from 'node:crypto';
import User from '../models/User.js';
import { protect, requireRole } from '../middleware/auth.js';
import { str, email, oneOf, bool, firstError } from '../utils/validate.js';
import { ROLES } from '../constants.js';

const router = Router();
const tempPassword = () => crypto.randomBytes(12).toString('base64url');

// Any staff member: active colleagues, for the "assign to" picker.
router.get('/staff', protect, async (req, res) => {
  const users = await User.find({ active: true }).select('name role').sort({ name: 1 });
  res.json({ success: true, data: users });
});

// Admin only below.
router.use(protect, requireRole('admin'));

router.get('/', async (req, res) => {
  const users = await User.find().sort({ createdAt: 1 });
  res.json({ success: true, data: users });
});

router.post('/', async (req, res) => {
  const b = req.body || {};
  const error = firstError({
    name: str(b.name, { required: true, min: 2, max: 100 }),
    email: email(b.email, { required: true }),
    role: oneOf(b.role, ROLES, { required: true }),
  });
  if (error) return res.status(400).json({ success: false, error });
  if (await User.exists({ email: b.email.toLowerCase().trim() })) {
    return res.status(409).json({ success: false, error: 'A staff member with this email already exists' });
  }

  const password = tempPassword();
  const user = await User.create({ name: b.name.trim(), email: b.email.trim(), role: b.role, password });
  // The temporary password is returned once so the admin can pass it on; it is never stored in plain text.
  res.status(201).json({ success: true, data: user, tempPassword: password });
});

router.put('/:id', async (req, res) => {
  const b = req.body || {};
  const error = firstError({
    name: str(b.name, { max: 100 }),
    role: oneOf(b.role, ROLES),
  });
  if (error) return res.status(400).json({ success: false, error });

  const isSelf = String(req.user._id) === req.params.id;
  if (isSelf && ((b.role && b.role !== 'admin') || b.active === false || b.active === 'false')) {
    return res.status(400).json({ success: false, error: 'You cannot remove your own admin access' });
  }

  const update = {};
  if (b.name) update.name = b.name.trim();
  if (b.role) update.role = b.role;
  if (b.active !== undefined) update.active = bool(b.active);

  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }).catch(() => null);
  if (!user) return res.status(404).json({ success: false, error: 'Staff member not found' });
  res.json({ success: true, data: user });
});

router.post('/:id/reset-password', async (req, res) => {
  const user = await User.findById(req.params.id).catch(() => null);
  if (!user) return res.status(404).json({ success: false, error: 'Staff member not found' });
  const password = tempPassword();
  user.password = password;
  await user.save();
  res.json({ success: true, tempPassword: password });
});

export default router;
