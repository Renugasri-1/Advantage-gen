const express = require("express");
const fs = require("fs");
const path = require("path");

const enhancePrompt = require("../services/promptService");
const generateImage = require("../services/imageService");
const generateCopy = require("../services/copyService");
const applyBranding = require("../services/brandingService");
const cloudinary = require("../services/cloudinaryService");
const Campaign = require("../models/Campaign");
const handleRateLimit = require("../utils/handleRateLimit");

const router = express.Router();

/* =========================================
   GENERATE CAMPAIGN
========================================= */

router.post("/generate-campaign", async (req, res) => {
  try {

    const { prompt, tone = "Professional", platform = "Instagram" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    // Enhance Prompt
    const enhancedPrompt = await enhancePrompt(prompt);

    // Generate Image
    const imageBase64 = await generateImage(enhancedPrompt);

    const baseImageBuffer = Buffer.from(
      imageBase64.split(",")[1],
      "base64"
    );

    const baseImagePath = path.join(__dirname, "../outputs/base.png");
    fs.writeFileSync(baseImagePath, baseImageBuffer);

    // Apply Branding
    const finalImagePath = path.join(__dirname, "../outputs/final.png");

    await applyBranding(
      baseImagePath,
      path.join(__dirname, "../assets/logo.png"),
      finalImagePath
    );

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(finalImagePath, {
      folder: "advantage-gen"
    });

    const imageUrl = result.secure_url;

    // Generate Copy
    const copy = await generateCopy(prompt, tone, platform);

    // Save Campaign
    const newCampaign = await Campaign.create({
      title: prompt,
      originalPrompt: prompt,
      enhancedPrompt,
      generatedCopy: copy,
      imageUrl
    });

    res.json({
      status: "success",
      originalPrompt: prompt,
      enhancedPrompt,
      imageUrl,
      copy,
      campaignId: newCampaign._id
    });

  } catch (error) {
    console.error(error);
    handleRateLimit(error, res);
  }
});


/* =========================================
   REMIX CAMPAIGN
========================================= */



router.post("/remix/:id", async (req, res) => {
  try {

    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    const newPrompt =
      campaign.originalPrompt + " with a modern creative twist";

    const enhancedPrompt = await enhancePrompt(newPrompt);

    const imageBase64 = await generateImage(enhancedPrompt);

    
    const baseImagePath = path.join(__dirname, "../outputs/remix_base.png");
    
    const baseImageBuffer = Buffer.from(
  imageBase64.split(",")[1],
  "base64"
);

    fs.writeFileSync(baseImagePath, baseImageBuffer);

  
    const finalImagePath = path.join(__dirname, "../outputs/remix_final.png");

    
    await applyBranding(
      baseImagePath,
      path.join(__dirname, "../assets/logo.png"),
      finalImagePath
    );

    const copy = await generateCopy(enhancedPrompt);

    const result = await cloudinary.uploader.upload(finalImagePath);

    const imageUrl = result.secure_url;

    const newCampaign = await Campaign.create({
      title: newPrompt,
      originalPrompt: newPrompt,
      enhancedPrompt,
      generatedCopy: copy,
      imageUrl
    });

    res.json({
      status: "success",
      message: "Remix campaign created",
      imageUrl,
      copy,
      campaignId: newCampaign._id
    });

  } catch (error) {
    console.error(error);
    handleRateLimit(error, res);
  }
});


/* =========================================
   FETCH CAMPAIGN HISTORY
========================================= */

router.get("/campaigns", async (req, res) => {
  try {

    const campaigns = await Campaign.find()
      .sort({ createdAt: -1 });

    res.json({
      total: campaigns.length,
      campaigns
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch campaigns"
    });
  }
});


module.exports = router;


