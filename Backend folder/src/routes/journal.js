const express = require('express');
const JournalEntry = require('../models/JournalEntry');
const store = require('../store');
const { requireAuth } = require('../middleware/auth');
const { text } = require('../utils/validation');

const router = express.Router();
router.use(requireAuth);
function safeAnalysis(content) {
  const lower = content.toLowerCase();
  const themes = ['stress', 'sleep', 'work', 'relationships', 'anxiety'].filter((item) => lower.includes(item));
  return { themes, note: 'This is a general reflection summary, not a diagnosis.' };
}
router.post('/', async (req, res, next) => {
  try {
    const content = text(req.body.content, 'Journal content', 10000);
    const data = { userId: req.user.sub, title: String(req.body.title || 'Untitled reflection').slice(0, 120), content, allowAnalysis: Boolean(req.body.allowAnalysis), analysis: req.body.allowAnalysis ? safeAnalysis(content) : null };
    const entry = req.app.locals.mongoEnabled ? await JournalEntry.create(data) : store.insert('journals', data);
    return res.status(201).json({ entry });
  } catch (error) { return next(error); }
});
router.get('/', async (req, res, next) => {
  try {
    const entries = req.app.locals.mongoEnabled ? await JournalEntry.find({ userId: req.user.sub }).sort({ createdAt: -1 }).lean() : store.find('journals', (item) => String(item.userId) === String(req.user.sub)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json({ entries });
  } catch (error) { return next(error); }
});
router.delete('/:id', async (req, res, next) => {
  try {
    if (req.app.locals.mongoEnabled) await JournalEntry.deleteOne({ _id: req.params.id, userId: req.user.sub });
    else store.remove('journals', (item) => String(item._id) === req.params.id && String(item.userId) === String(req.user.sub));
    return res.json({ message: 'Journal entry deleted.' });
  } catch (error) { return next(error); }
});
module.exports = router;
