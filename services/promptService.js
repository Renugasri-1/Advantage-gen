
const axios = require("axios");

axios.defaults.headers.common["Accept"] = "application/json";
async function enhancePrompt(userPrompt) {
  try {
    const systemMessage = `
You are a professional prompt enhancer.
Rewrite the user-provided prompt into a highly detailed Stable Diffusion image prompt.
Do NOT include reasoning steps; give only the final prompt.
Include camera details, lighting, mood, texture, and realism.
`;

    const response = await axios(
      {
        method: "post",
  url: "https://router.huggingface.co/v1/chat/completions",
  headers: {
    Authorization: `Bearer ${process.env.HF_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  data: {
    model: "deepseek-ai/DeepSeek-R1:fastest",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 400
  }
      },
      
      
    );

    // Extract the text
    let enhanced = response.data.choices[0].message.content;

    // Remove any <think> tags and extra whitespace
    enhanced = enhanced
  .replace(/<think>[\s\S]*?<\/think>/gi, "")  // normal case
  .replace(/<think>[\s\S]*/gi, "")           // broken case
  .trim();

    return enhanced;

  } catch (error) {
    console.error("HF ERROR:", error.response?.data || error.message);
    throw new Error("Prompt enhancement failed");
  }
}

module.exports = enhancePrompt;




