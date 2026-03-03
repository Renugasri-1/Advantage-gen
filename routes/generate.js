const express = require("express");
const fs = require("fs");
const path = require("path");

const enhancePrompt = require("../services/promptService");
const generateImage = require("../services/imageService");
const generateCopy = require("../services/copyService");
const applyBranding = require("../services/brandingService");

const router = express.Router();

router.post("/generate-campaign", async (req, res) => {
  try {
    const { prompt, tone = "Professional", platform = "Instagram" } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    //  Enhance Prompt
    const enhancedPrompt = await enhancePrompt(prompt);

    //  Generate Image (Base64)
    const imageBase64 = await generateImage(enhancedPrompt);
    console.log("Image preview:", imageBase64.substring(0, 50));

    //  Save Base Image
    const baseImageBuffer = Buffer.from(
      imageBase64.split(",")[1],
      "base64"
    );

    const baseImagePath = path.join(__dirname, "../outputs/base.png");
    fs.writeFileSync(baseImagePath, baseImageBuffer);

    //  Apply Branding (Logo + CTA)
    const finalImagePath = path.join(__dirname, "../outputs/final.png");

    await applyBranding(
      baseImagePath,
      path.join(__dirname, "../assets/logo.png"), //  logo file
      finalImagePath
    );

    //  Generate Caption + Hashtags
    const copy = await generateCopy(prompt, tone, platform);

    // Final Response
    res.json({
      status: "success",
      originalPrompt: prompt,
      enhancedPrompt,
      brandedImage: "outputs/final.png",
      copy
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


