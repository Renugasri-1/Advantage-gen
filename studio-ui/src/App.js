import { useState } from "react";
import "./App.css";
import PromptForm from "./components/PromptForm";
import Editor from "./components/Editor";

function App() {
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <div className="app-container">
      <h1>AI Campaign Studio</h1>

      <PromptForm onImageGenerated={setImageUrl} />

      {imageUrl && <Editor imageUrl={imageUrl} />}
    </div>
  );
}

export default App;
