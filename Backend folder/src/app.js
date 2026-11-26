const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth');
const assessmentRoutes = require('./routes/assessments');
const moodRoutes = require('./routes/mood');
const journalRoutes = require('./routes/journal');
const chatRoutes = require('./routes/chat');
const dashboardRoutes = require('./routes/dashboard');
const { notFound, errorHandler } = require('./middleware/error');

async function createApp() {
  const app = express();
  app.locals.mongoEnabled = await connectDatabase();
  app.use(helmet());
  app.use(cors({ origin: env.clientUrl, credentials: false }));
  app.use(express.json({ limit: '1mb' }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }));
  app.get('/api/health', (req, res) => res.json({ ok: true, database: app.locals.mongoEnabled ? 'mongodb' : 'memory-fallback', service: 'mythiorapy-api' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/assessments', assessmentRoutes);
  app.use('/api/mood', moodRoutes);
  app.use('/api/journal', journalRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/dashboard', dashboardRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = createApp;
