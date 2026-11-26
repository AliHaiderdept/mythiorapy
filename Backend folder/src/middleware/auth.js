const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signUser(user) {
  return jwt.sign({ sub: String(user._id), role: user.role, email: user.email }, env.jwtSecret, { expiresIn: '7d' });
}

function requireAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentication required.' });
  try {
    req.user = jwt.verify(token, env.jwtSecret);
    return next();
  } catch {
    return res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' });
  return next();
}

module.exports = { signUser, requireAuth, requireAdmin };
