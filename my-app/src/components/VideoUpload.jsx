import React, { useState } from "react";
import axios from "axios";

const VideoUpload = ({ setProcessedVideoURL }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsUploading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.processed_video) {
        const processedPath = response.data.processed_video;  
        setProcessedVideoURL(`http://127.0.0.1:8000/${processedPath}`);
      } else {
        alert("Processing failed.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload a Video for Vehicle Detection</h3>
      <input type="file" onChange={handleFileChange} accept="video/*" />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload and Process"}
      </button>
    </div>
  );
};

export default VideoUpload;
