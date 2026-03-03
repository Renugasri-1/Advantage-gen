const axios = require("axios");

async function generateImage(prompt) {
  try {
    const response = await axios.post(
      "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "image/png"
        },
        responseType: "arraybuffer" 
      }
    );

    // Convert binary → base64
    const base64Image = Buffer.from(response.data).toString("base64");

    return `data:image/png;base64,${base64Image}`;

  } catch (error) {
    console.error("HF IMAGE ERROR:", error.response?.data || error.message);
    throw new Error("Image generation failed");
  }
}

module.exports = generateImage;