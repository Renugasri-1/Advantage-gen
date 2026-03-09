import axios from "axios";
import { useState } from "react";

export default function PromptForm({ onImageGenerated }) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    const res = await axios.post("http://localhost:5000/api/generate-campaign", {
      prompt,
      tone: "premium",
      platform: "instagram"
    });

     console.log("Full response:", res.data);
    console.log("brandedImage value:", res.data.brandedImage);
    
    onImageGenerated("http://localhost:5000/" + res.data.brandedImage);
  };

  return (
  <div className="prompt-section">
    <input
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      placeholder="Enter prompt"
    />
    <button onClick={handleGenerate}>Generate</button>       
  </div>
);
}


