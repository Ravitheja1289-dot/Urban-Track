import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LiveFeed from "./components/LiveFeed";
import Analytics from "./components/Analytics";
import About from "./components/About";

const App = () => (
  <div>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<LiveFeed />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </div>
);

export default App;