import React from "react";
import DashboardWidgets from "../components/dashboardWidget";
import MarketData from "../components/MarketChart";
import HistoricalData from "../components/HistoricalData";
import "../components/styles/dashboard.css"; // Ensure you create this CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome, Jerry 🔥</h2>
      <DashboardWidgets />
      <MarketData />
      <HistoricalData />
    </div>
  );
};

export default Dashboard;
