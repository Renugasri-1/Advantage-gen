import { useState } from "react";
import "./App.css";
import PromptForm from "./components/PromptForm";
import Editor from "./components/Editor";

function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [copy, setCopy] = useState("");
  //const [campaigns, setCampaigns] = useState([]);
  const [campaignId, setCampaignId] = useState(null);

  return (
    <div className="app-container">
      <h1>AI Campaign Studio</h1>

      <PromptForm onImageGenerated={(img, generatedCopy) => {
        setImageUrl(img);
        setCopy(generatedCopy);
      }} onCampaignGenerated={setCampaignId} />

      {imageUrl && <Editor imageUrl={imageUrl}  campaignId={campaignId} setImageUrl={setImageUrl}/>}
      {copy && (
        <div className="caption-box">
          <h3>Generated caption & Hashtags</h3>
          <p>{copy}</p>
        </div>
      )}
    </div>
  );
}

export default App;
