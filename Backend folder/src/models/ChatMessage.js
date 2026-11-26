const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true, maxlength: 6000 },
  sources: [{ title: String, url: String }],
  safety: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.models.ChatMessage || mongoose.model('ChatMessage', chatSchema);
