const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  mood: { type: Number, min: 1, max: 5, required: true },
  energy: { type: Number, min: 1, max: 5, required: true },
  stress: { type: Number, min: 1, max: 5, required: true },
  sleepQuality: { type: Number, min: 1, max: 5, required: true },
  note: { type: String, maxlength: 1000, default: '' },
  recordedAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.models.MoodEntry || mongoose.model('MoodEntry', moodSchema);
