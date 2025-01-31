import React from "react";
import "../components/styles/dashboardWidget.css"; // Ensure you create this CSS file

const DashboardWidgets = () => {
  return (
    <div className="widgets-container">
      {/* Total Balance */}
      <div className="widget">
        <h5>Total Balance</h5>
        <p className="amount">$24,847.84</p>
        <span className="change positive">+16.8% (Compared to last month)</span>
      </div>

      {/* Total Investment */}
      <div className="widget">
        <h5>Total Investment</h5>
        <p className="amount">$846.50</p>
        <span className="change positive">+15.2% (Compared to last month)</span>
      </div>

      {/* Total Return */}
      <div className="widget">
        <h5>Total Return</h5>
        <p className="amount">$462.64</p>
        <span className="change negative">-12.8% (Compared to last month)</span>
      </div>

      {/* Market Trends */}
      <div className="widget">
        <h5>Market Trends</h5>
        <p className="amount">S&P 500: <span className="positive">+1.2%</span></p>
        <p className="amount">NASDAQ: <span className="negative">-0.5%</span></p>
      </div>
    </div>
  );
};

export default DashboardWidgets;
