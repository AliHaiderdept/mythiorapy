const express = require('express');
const Assessment = require('../models/Assessment');
const MoodEntry = require('../models/MoodEntry');
const store = require('../store');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);
router.get('/', async (req, res, next) => {
  try {
    let assessments; let moods;
    if (req.app.locals.mongoEnabled) {
      assessments = await Assessment.find({ userId: req.user.sub }).sort({ createdAt: -1 }).limit(20).lean();
      moods = await MoodEntry.find({ userId: req.user.sub }).sort({ recordedAt: -1 }).limit(30).lean();
    } else {
      assessments = store.find('assessments', (item) => String(item.userId) === String(req.user.sub)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);
      moods = store.find('moods', (item) => String(item.userId) === String(req.user.sub)).sort((a, b) => new Date(b.recordedAt) - new Date(a.recordedAt)).slice(0, 30);
    }
    return res.json({ overview: { assessmentsCount: assessments.length, moodEntriesCount: moods.length, latestAssessment: assessments[0] || null, latestMood: moods[0] || null }, assessments, moods, disclaimer: 'Progress data is for self-reflection and does not establish a diagnosis.' });
  } catch (error) { return next(error); }
});
module.exports = router;
