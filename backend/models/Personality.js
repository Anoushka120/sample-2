const mongoose = require('mongoose');

const PersonalitySchema = new mongoose.Schema({
  name: { type: String, required: true },   // e.g., "Realistic" or "INFJ"
  code: { type: String },                   // "R", "INFJ", etc.
  framework: { type: String, enum: ['RIASEC','MBTI','OTHER'], default: 'OTHER' },
  description: { type: String },
  traits: [String],
  suggestedCareers: [String]
});

module.exports = mongoose.model('Personality', PersonalitySchema);
