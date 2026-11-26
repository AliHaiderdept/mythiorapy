const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const store = require('../store');
const { requireAuth } = require('../middleware/auth');
const { text } = require('../utils/validation');

const router = express.Router();
router.use(requireAuth);
const sources = [
  { title: 'NIMH: Caring for Your Mental Health', url: 'https://www.nimh.nih.gov/health/topics/caring-for-your-mental-health' },
  { title: 'WHO: Mental health', url: 'https://www.who.int/health-topics/mental-health' },
  { title: 'NHS: Anxiety, fear and panic', url: 'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/anxiety-fear-and-panic/' },
];
function safetyMessage() { return 'I am concerned about your immediate safety. Please contact local emergency services or a crisis line now, tell a trusted person who can stay with you, and move away from anything you could use to hurt yourself. This assistant cannot provide emergency care.'; }
function answer(prompt) {
  const lower = prompt.toLowerCase();
  if (/(suicide|kill myself|end my life|self[- ]?harm|hurt myself|immediate danger)/i.test(lower)) return { content: safetyMessage(), safety: true, sources: [] };
  if (lower.includes('sleep')) return { content: 'A consistent wake time, a quieter wind-down routine, and reducing stimulating screen use before bed can support sleep. Persistent or severe sleep problems deserve discussion with a healthcare professional.', safety: false, sources: [sources[0]] };
  if (lower.includes('anx') || lower.includes('panic')) return { content: 'Anxiety can feel intense, but a brief grounding pause may help: notice five things you see, slow your exhale, and choose one small next step. If anxiety is disrupting daily life, consider qualified professional support.', safety: false, sources: [sources[2], sources[1]] };
  return { content: 'I can share general, evidence-informed information about stress, anxiety, sleep, mood, grounding, and self-reflection. Try naming what you are feeling, what triggered it, and one supportive action you can take today. This is education, not a diagnosis.', safety: false, sources: [sources[0], sources[1]] };
}
router.post('/', async (req, res, next) => {
  try {
    const prompt = text(req.body.message, 'Message', 6000);
    const response = answer(prompt);
    const data = [{ userId: req.user.sub, role: 'user', content: prompt, safety: response.safety }, { userId: req.user.sub, role: 'assistant', content: response.content, sources: response.sources, safety: response.safety }];
    if (req.app.locals.mongoEnabled) await ChatMessage.insertMany(data); else data.forEach((item) => store.insert('chats', item));
    return res.json({ message: response.content, safety: response.safety, sources: response.sources, provider: 'local-rag-fallback' });
  } catch (error) { return next(error); }
});
router.get('/history', async (req, res, next) => {
  try {
    const messages = req.app.locals.mongoEnabled ? await ChatMessage.find({ userId: req.user.sub }).sort({ createdAt: 1 }).limit(100).lean() : store.find('chats', (item) => String(item.userId) === String(req.user.sub)).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).slice(-100);
    return res.json({ messages });
  } catch (error) { return next(error); }
});
module.exports = router;
