import React, { useState, useEffect } from "react";
import "./VideoStream.css";

const VideoStream = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <div className="container">
      <div className="video-section">
        <h2 className="video-title">🔴 Live Vehicle Detection</h2>
        <div className="video-frame">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <img
              src="http://localhost:8000/video_feed"
              alt="Vehicle Detection Stream"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoStream;
