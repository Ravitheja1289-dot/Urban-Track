import React, { useState } from "react";
import VideoUpload from "./components/VideoUpload";
import ProcessedVideo from "./components/ProcessedVideo";

function App() {
  const [processedVideoURL, setProcessedVideoURL] = useState(null);

  return (
    <div className="container">
      <h1>Vehicle Detection using YOLO</h1>
      <VideoUpload setProcessedVideoURL={setProcessedVideoURL} />
      {processedVideoURL && <ProcessedVideo videoURL={processedVideoURL} />}
    </div>
  );
}

export default App;
