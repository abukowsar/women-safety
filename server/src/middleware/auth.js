import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, error: 'Not authorised' });

  try {
    const { id } = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(id);
    if (!user || !user.active) return res.status(401).json({ success: false, error: 'Not authorised' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Session expired, please log in again' });
  }
};

export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user.role)
    ? next()
    : res.status(403).json({ success: false, error: 'You do not have permission for this action' });
