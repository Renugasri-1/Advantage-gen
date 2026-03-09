function handleRateLimit(error, res) {

  // OpenAI / API rate limit
  if (error.response && error.response.status === 429) {
    return res.status(429).json({
      error: "AI service rate limit reached. Please try again later."
    });
  }

  // Generic AI error
  if (error.message && error.message.includes("rate")) {
    return res.status(429).json({
      error: "AI service is temporarily busy."
    });
  }

  // Default error
  return res.status(500).json({
    error: "Something went wrong"
  });
}

module.exports = handleRateLimit;