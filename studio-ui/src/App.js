import { useState } from "react";
import "./App.css";
import PromptForm from "./components/PromptForm";
import Editor from "./components/Editor";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignId, setCampaignId] = useState(null);

  return (
    <div className="app-container">
      <h1>AI Campaign Studio</h1>

      <PromptForm onImageGenerated={setImageUrl} onCampaignGenerated={setCampaignId} />

      {imageUrl && <Editor imageUrl={imageUrl} campaignId={campaignId} setImageUrl={setImageUrl}/>}
    </div>
  );
}

export default App;
