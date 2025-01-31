import React from "react";
import { Link } from "react-router-dom";
import "./styles/sidebar.css"; // Custom styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Robo-Advisor</h2>
      <ul className="sidebar-menu">
        <li><Link to="/">🏠 Dashboard</Link></li>
        <li><Link to="/wallet">💰 My Wallet</Link></li>
        <li><Link to="/portfolio" >📑 Portfolio Management</Link></li>
        <li><Link to="/transactions">📑 Transactions</Link></li>
        <li><Link to="/investment">📈 Investment</Link></li>
        <li><Link to="/reports">📊 Reports</Link></li>
        <li><Link to="/settings">⚙️ Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
