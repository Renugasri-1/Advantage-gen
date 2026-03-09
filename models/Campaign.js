const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: String,
  originalPrompt: String,
  enhancedPrompt: String,
  generatedCopy: String,
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model("Campaign", campaignSchema);