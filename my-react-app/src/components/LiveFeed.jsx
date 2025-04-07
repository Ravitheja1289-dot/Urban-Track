import React from "react";
import { Video } from "lucide-react";

const API_BASE = "http://localhost:8000";

const LiveFeed = () => (
  <section className="live-feed-container">
    <h2 className="live-feed-title flex items-center gap-2">
      <Video /> Live Traffic Feed
    </h2>
    <img
      src={`${API_BASE}/video_feed`}
      alt="Live feed"
      className="live-feed-image"
    />
  </section>
);

export default LiveFeed;
