
import React, { useEffect, useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from "recharts";

const API_BASE = "http://0.0.0.0:8000";

const Analytics = () => {
  const [count, setCount] = useState(0);
  const [vehicleTypes, setVehicleTypes] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`${API_BASE}/vehicle_count`);
      const data = await res.json();
      setCount(data.count);
      setVehicleTypes(data.types);
      setHistory((prev) => [...prev.slice(-19), { time: new Date().toLocaleTimeString(), count: data.count }]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];
  
  const vehicleTypeData = Object.entries(vehicleTypes).map(([type, count]) => ({
    name: type,
    value: count
  }));

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
          <h3 className="text-xl font-semibold mb-4">Vehicle Types Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={vehicleTypeData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({name, value}) => `${name}: ${value}`}
            >
              {vehicleTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="chart-card">
          <h3 className="text-xl font-semibold mb-4">Vehicle Types Count</h3>
          <BarChart width={500} height={300} data={vehicleTypeData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {vehicleTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
