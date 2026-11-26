const express = require('express');
const MoodEntry = require('../models/MoodEntry');
const store = require('../store');
const { requireAuth } = require('../middleware/auth');
const { number } = require('../utils/validation');

const router = express.Router();
router.use(requireAuth);
router.post('/', async (req, res, next) => {
  try {
    const data = { userId: req.user.sub, mood: number(req.body.mood, 'Mood', 1, 5), energy: number(req.body.energy, 'Energy', 1, 5), stress: number(req.body.stress, 'Stress', 1, 5), sleepQuality: number(req.body.sleepQuality, 'Sleep quality', 1, 5), note: String(req.body.note || '').slice(0, 1000) };
    const entry = req.app.locals.mongoEnabled ? await MoodEntry.create(data) : store.insert('moods', data);
    return res.status(201).json({ entry });
  } catch (error) { return next(error); }
});
router.get('/history', async (req, res, next) => {
  try {
    const entries = req.app.locals.mongoEnabled ? await MoodEntry.find({ userId: req.user.sub }).sort({ recordedAt: -1 }).limit(90).lean() : store.find('moods', (item) => String(item.userId) === String(req.user.sub)).sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt)).slice(0, 90);
    return res.json({ entries });
  } catch (error) { return next(error); }
});
module.exports = router;
