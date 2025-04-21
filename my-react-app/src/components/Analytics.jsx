import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const API_BASE = "http://localhost:8000";

const Analytics = () => {
  const [count, setCount] = useState(0);
  const [types, setTypes] = useState({});
  const [history, setHistory] = useState([]);
  const [emergencyDetected, setEmergencyDetected] = useState(false); // State to hold emergency vehicle status

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${API_BASE}/vehicle_count`);
      const data = await res.json();
      setCount(data.count);
      setTypes(data.types);
      setHistory((prev) => [
        ...prev.slice(-19),
        { time: new Date().toLocaleTimeString(), count: data.count },
      ]);

      // Fetch the emergency vehicle detection status
      const emergencyRes = await fetch(`${API_BASE}/emergency_status`);
      const emergencyData = await emergencyRes.json();
      setEmergencyDetected(emergencyData.emergency_detected); // Update the emergency status
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#8dd1e1", "#a4de6c"];

  // Inline CSS styles
  const styles = {
    container: {
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1.5rem',
      marginTop: '2rem',
    },
    chartCard: {
      backgroundColor: '#1f2937',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    emergencyStatus: {
      padding: '10px',
      textAlign: 'center',
      fontSize: '18px',
      borderRadius: '5px',
    },
    emergencyDetected: {
      backgroundColor: '#fef2f2',
      color: '#f44336',
    },
    noEmergency: {
      backgroundColor: '#f0fdf4',
      color: '#4caf50',
    },
  };

  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Real-Time Analytics</h2>

      {/* Two charts in grid */}
      <div style={styles.grid}>
        <div style={styles.chartCard}>
          <h3 className="text-xl font-semibold mb-4">Live Vehicle Count</h3>
          <LineChart width={500} height={300} data={history}>
            <XAxis dataKey="time" stroke="#ccc" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div style={styles.chartCard}>
          <h3 className="text-xl font-semibold mb-4">Current Vehicle Load</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={[
                { name: "Vehicles", value: count },
                { name: "Space", value: Math.max(0, 100 - count) },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-load-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Vehicle Type Counts and Emergency Vehicle Detection side by side */}
      <div style={styles.grid}>
        <div style={styles.chartCard}>
          <h3 className="text-xl font-semibold mb-4">Vehicle Type Counts</h3>
          <ul className="text-lg space-y-2">
            {Object.entries(types).map(([type, value]) => (
              <li key={type}>
                <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency vehicle detection status */}
        <div style={styles.chartCard}>
          <h3 className="text-xl font-semibold mb-4">Emergency Vehicle Detection</h3>
          <div
            style={{
              ...styles.emergencyStatus,
              ...(emergencyDetected ? styles.emergencyDetected : styles.noEmergency),
            }}
          >
            {emergencyDetected ? (
              <span className="font-bold">Emergency Vehicle Detected!</span>
            ) : (
              <span className="font-bold">No Emergency Vehicle Detected</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
