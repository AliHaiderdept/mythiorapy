const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const store = require('../store');
const { signUser, requireAuth } = require('../middleware/auth');

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function publicUser(user) { return { id: String(user._id), name: user.name, email: user.email, phone: user.phone || '', role: user.role }; }

router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, phone = '' } = req.body;
    if (!name || name.length > 80 || !emailPattern.test(email || '') || !password || password.length < 8) return res.status(400).json({ error: 'Name, valid email, and password of at least 8 characters are required.' });
    const normalizedEmail = email.toLowerCase().trim();
    const existing = req.app.locals.mongoEnabled ? await User.findOne({ email: normalizedEmail }) : store.findOne('users', (item) => item.email === normalizedEmail);
    if (existing) return res.status(409).json({ error: 'An account with this email already exists.' });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = req.app.locals.mongoEnabled ? await User.create({ name: name.trim(), email: normalizedEmail, passwordHash, phone }) : store.insert('users', { name: name.trim(), email: normalizedEmail, passwordHash, phone, role: 'user' });
    return res.status(201).json({ token: signUser(user), user: publicUser(user) });
  } catch (error) { return next(error); }
});

router.post('/login', async (req, res, next) => {
  try {
    const normalizedEmail = String(req.body.email || '').toLowerCase().trim();
    const user = req.app.locals.mongoEnabled ? await User.findOne({ email: normalizedEmail }).select('+passwordHash') : store.findOne('users', (item) => item.email === normalizedEmail);
    if (!user || !(await bcrypt.compare(String(req.body.password || ''), user.passwordHash))) return res.status(401).json({ error: 'Email or password is incorrect.' });
    return res.json({ token: signUser(user), user: publicUser(user) });
  } catch (error) { return next(error); }
});

router.post('/logout', requireAuth, (req, res) => res.json({ message: 'Signed out.' }));

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = req.app.locals.mongoEnabled ? await User.findById(req.user.sub) : store.findOne('users', (item) => String(item._id) === String(req.user.sub));
    if (!user) return res.status(404).json({ error: 'User not found.' });
    return res.json({ user: publicUser(user) });
  } catch (error) { return next(error); }
});

module.exports = router;
