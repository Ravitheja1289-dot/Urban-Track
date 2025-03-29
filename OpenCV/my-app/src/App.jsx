import React from "react";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Move Smart</h1>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h2 className="title">Live Traffic Video Stream</h2>
        <div className="video-container">
          <img
            src="http://localhost:8000/video_feed"
            alt="Traffic Video Stream"
            className="video-stream"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 Move Smart. All rights reserved.
      </footer>
    </div>
  );
};

export default App;