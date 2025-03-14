import React from "react";

const ProcessedVideo = ({ videoURL }) => {
  return (
    <div className="processed-video-container">
      <h3>Processed Video</h3>
      <video controls width="640">
        <source src={videoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ProcessedVideo;
