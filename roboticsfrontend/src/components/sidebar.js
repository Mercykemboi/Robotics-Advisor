import React from "react";
import { Link } from "react-router-dom";
import "./styles/sidebar.css"; // Custom styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Robo-Advisor</h2>
      <ul className="sidebar-menu">
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/financials">📈 Financial Goals</Link></li>
        <li><Link to="/portfolio" >📑 Portfolio Management</Link></li>
        <li><Link to = "/risk">📑 Manage Your Risk</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
        <li><Link to="/">⚙️ Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
