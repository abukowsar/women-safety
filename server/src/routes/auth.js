import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { str, email, firstError } from '../utils/validate.js';

const router = Router();

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

router.post('/login', loginLimiter, async (req, res) => {
  const { email: mail, password } = req.body || {};
  const error = firstError({ email: email(mail, { required: true }), password: str(password, { required: true, max: 200 }) });
  if (error) return res.status(400).json({ success: false, error });

  const user = await User.findOne({ email: String(mail).toLowerCase() }).select('+password');
  if (!user || !user.active || !(await user.matchPassword(password))) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
  res.json({ success: true, token });
});

router.get('/me', protect, (req, res) => {
  res.json({ success: true, data: req.user });
});

router.put('/password', protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const error = firstError({
    currentPassword: str(currentPassword, { required: true, max: 200 }),
    newPassword: str(newPassword, { required: true, min: 10, max: 200 }),
  });
  if (error) return res.status(400).json({ success: false, error });

  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.matchPassword(currentPassword))) {
    return res.status(401).json({ success: false, error: 'Current password is incorrect' });
  }
  user.password = newPassword;
  await user.save();
  res.json({ success: true });
});

export default router;
