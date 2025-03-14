import React from "react";
import VideoStream from "./VideoStream";
import "./App.css";

const App = () => {
  return (
    <div>
      <nav className="navbar">
        <h2 className="logo">  Move Smart</h2>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Live Stream</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <VideoStream />

      <footer className="footer">
        <p>© 2025 Vehicle Detection System | Built by GTR Developers</p>
      </footer>
    </div>
  );
};

export default App;
