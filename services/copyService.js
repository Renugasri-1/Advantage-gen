const axios = require("axios");

async function generateCopy(prompt, tone, platform) {
  try {

    const systemMessage = `
You are a professional social media marketing expert.
Generate a high-converting caption and 8-12 relevant hashtags.
Do NOT explain anything.
Return only caption and hashtags.
`;

    const response = await axios({
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
          { role: "user", content: `
Product: ${prompt}
Tone: ${tone}
Platform: ${platform}
          `}
        ],
        temperature: 0.7,
        max_tokens: 300
      }
    });

    let content = response.data.choices[0].message.content;

content = content.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();

return content;
  } catch (error) {
    console.error("HF COPY ERROR:", error.response?.data || error.message);
    throw new Error("Copy generation failed");
  }
}

module.exports = generateCopy;