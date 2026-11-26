const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, maxlength: 120, default: 'Untitled reflection' },
  content: { type: String, required: true, maxlength: 10000 },
  allowAnalysis: { type: Boolean, default: false },
  analysis: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: true });

module.exports = mongoose.models.JournalEntry || mongoose.model('JournalEntry', journalSchema);
