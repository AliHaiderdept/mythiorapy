const mongoose = require('mongoose');
const env = require('./env');

async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn('MONGODB_URI is not configured; using the development in-memory store.');
    return false;
  }
  await mongoose.connect(env.mongoUri);
  console.log('MongoDB connected');
  return true;
}

module.exports = connectDatabase;
