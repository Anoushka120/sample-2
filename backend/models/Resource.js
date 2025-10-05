const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String },
  type: { type: String, enum: ['course','article','book','video','website','other'], default: 'article' },
  description: { type: String },
  tags: [String],
  url1: { type: String },
  title2: { type: String },
  url2: { type: String },
  title3: { type: String },
  mappedPersonalities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Personality' }],
  createdAt: { type: Date, default: Date.now }
});

// text index for basic search
ResourceSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Resource', ResourceSchema);
