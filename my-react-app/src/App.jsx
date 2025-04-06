// This will be a production-ready React app with Tailwind CSS, Framer Motion, Recharts, and live API integration
// for the "Move Smart" traffic monitoring system.
// Here's a full implementation sketch with routing and features split into components.

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import { MapPin, Video, AlertTriangle } from "lucide-react";

const API_BASE = "http://localhost:8000";

const Navbar = () => (
  <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold">Move Smart Dashboard</h1>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/live" className="hover:underline">Live Feed</Link>
      <Link to="/analytics" className="hover:underline">Analytics</Link>
      <Link to="/about" className="hover:underline">About</Link>
    </div>
  </div>
);

const Home = () => (
  <motion.div className="p-6 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    <h2 className="text-3xl font-bold mb-4">Welcome to Move Smart</h2>
    <p className="mb-4 text-lg">
      An AI-powered traffic management system that dynamically adjusts signals based on real-time congestion,
      detects emergency vehicles, and visualizes traffic analytics for better urban mobility.
    </p>
  </motion.div>
);

const LiveFeed = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Video /> Live Traffic Feed</h2>
    <img
      src={`${API_BASE}/video_feed`}
      alt="Live feed"
      className="rounded-xl shadow-xl border-4 border-gray-700"
    />
  </div>
);

const Analytics = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${API_BASE}/vehicle_count`);
      const data = await res.json();
      setCount(data.count);
      setHistory((prev) => [...prev.slice(-19), { time: new Date().toLocaleTimeString(), count: data.count }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Real-Time Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Live Vehicle Count</h3>
          <LineChart width={500} height={300} data={history}>
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Current Vehicle Load</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={[{ name: "Vehicles", value: count }, { name: "Space", value: 100 - count }]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="p-6 text-white">
    <h2 className="text-2xl font-bold mb-4">About Move Smart</h2>
    <p className="mb-2">
      Move Smart uses <strong>YOLOv8, OpenCV</strong>, and <strong>FastAPI</strong> to create a dynamic, real-time traffic control and emergency vehicle detection system.
    </p>
    <p className="mb-2">Built by: <strong>Your Name</strong></p>
    <p className="mb-2">Tech Stack: React, Tailwind, FastAPI, OpenCV, YOLOv8</p>
    <p className="mb-2">Hackathon/Research Project 2025</p>
  </div>
);

const App = () => (
  <div className="bg-gray-900 min-h-screen font-sans">
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
