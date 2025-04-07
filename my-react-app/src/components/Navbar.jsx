import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <h1>Move Smart Dashboard</h1>
    <div>
      <Link to="/">Home</Link>
      <Link to="/live">Live Feed</Link>
      <Link to="/analytics">Analytics</Link>
      <Link to="/about">About</Link>
    </div>
  </nav>
);

export default Navbar;