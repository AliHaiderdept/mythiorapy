const express = require('express');
const Assessment = require('../models/Assessment');
const store = require('../store');
const { requireAuth } = require('../middleware/auth');
const { configs, getConfig, scoreAssessment } = require('../assessments/catalog');

const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => res.json({ assessments: Object.entries(configs).map(([id, config]) => ({ id, title: config.title, questionCount: config.questions.length, maxScore: config.maxScore })) }));
router.get('/:type', (req, res) => {
  const config = getConfig(req.params.type);
  if (!config) return res.status(404).json({ error: 'Assessment type not found.' });
  return res.json({ id: req.params.type, title: config.title, questions: config.questions, disclaimer: 'This screening is educational and does not provide a diagnosis.' });
});
router.post('/:type/submit', async (req, res, next) => {
  try {
    const result = scoreAssessment(req.params.type, req.body.answers);
    if (!result) return res.status(404).json({ error: 'Assessment type not found.' });
    const recordData = { userId: req.user.sub, type: req.params.type, answers: result.answers, result };
    const record = req.app.locals.mongoEnabled ? await Assessment.create(recordData) : store.insert('assessments', recordData);
    return res.status(201).json({ assessment: { id: String(record._id), type: record.type, createdAt: record.createdAt, ...result } });
  } catch (error) { return next(error); }
});
router.get('/history/all', async (req, res, next) => {
  try {
    const history = req.app.locals.mongoEnabled ? await Assessment.find({ userId: req.user.sub }).sort({ createdAt: -1 }).lean() : store.find('assessments', (item) => String(item.userId) === String(req.user.sub)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json({ history });
  } catch (error) { return next(error); }
});
module.exports = router;
