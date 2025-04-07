import React, { useEffect, useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";

const API_BASE = "http://localhost:8000";

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
    <section className="analytics-container">
      <h2 className="analytics-title">Real-Time Analytics</h2>
      <div className="analytics-grid">
        <div className="chart-card">
          <h3 className="text-xl font-semibold mb-4">Live Vehicle Count</h3>
          <LineChart width={500} height={300} data={history}>
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="chart-card">
          <h3 className="text-xl font-semibold mb-4">Current Vehicle Load</h3>
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
    </section>
  );
};

export default Analytics;