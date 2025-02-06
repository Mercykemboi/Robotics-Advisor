import React, { useState, useEffect } from "react";
import { getPortfolios, getPortfolioPerformance, updatePortfolioAssets, deletePortfolio, createPortfolio } from "../services/apis";
import "../components/styles/portfolio.css"; 
import { FaChartLine, FaTrashAlt, FaEdit, FaSave, FaPlusCircle } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useNavigate } from "react-router-dom";

const Portfolio = () => {
  const navigate = useNavigate();
  const [newPortfolio, setNewPortfolio] = useState({ name: "" });
  const [portfolios, setPortfolios] = useState([]);
  const [editingPortfolio, setEditingPortfolio] = useState(null);
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    getPortfolios().then(setPortfolios);
  }, []);

  // Fetch performance data for a selected portfolio
  const fetchPerformanceData = async (portfolioId) => {
    const data = await getPortfolioPerformance(portfolioId);
    setPerformanceData(prevData => ({ ...prevData, [portfolioId]: data }));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      portfolios.forEach(async (portfolio) => {
        const updatedPerformance = await getPortfolioPerformance(portfolio._id);
        setPortfolios((prev) =>
          prev.map((p) =>
            p._id === portfolio._id ? { ...p, performance: updatedPerformance } : p
          )
        );
      });
    }, 30000); // Refresh every 30 seconds
  
    return () => clearInterval(interval);
  }, [portfolios]);
  

  const handleAddPortfolio = async () => {
    if (!newPortfolio.name) return;
    const addedPortfolio = await createPortfolio(newPortfolio);
    setPortfolios([...portfolios, addedPortfolio]);
    setNewPortfolio({ name: "" });
  };

  const handleEditPortfolio = (portfolio) => {
    setEditingPortfolio(portfolio);
  };

  const handleAssetChange = (index, field, value) => {
    const updatedAssets = [...editingPortfolio.assets];
    updatedAssets[index][field] = value;
    setEditingPortfolio({ ...editingPortfolio, assets: updatedAssets });
  };

  const handleSaveChanges = async () => {
    if (!editingPortfolio) return;

    // Ensure total allocation does not exceed 100%
    const totalAllocation = editingPortfolio.assets.reduce((sum, asset) => sum + asset.allocation, 0);
    if (totalAllocation > 100) {
      alert("Total allocation cannot exceed 100%.");
      return;
    }

    const updatedPortfolio = await updatePortfolioAssets(editingPortfolio._id, editingPortfolio.assets);
    setPortfolios(portfolios.map(p => (p._id === editingPortfolio._id ? updatedPortfolio : p)));
    setEditingPortfolio(null);
  };

  const handleDeletePortfolio = async (portfolioId) => {
    await deletePortfolio(portfolioId);
    setPortfolios(portfolios.filter(p => p._id !== portfolioId));
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="portfolio-container">
      <h2>📈 Portfolio Management & Performance Tracking</h2>

      {/* Portfolio Input Form */}
      <div className="portfolio-form">
        <input 
          type="text" 
          placeholder="Enter Portfolio Name" 
          value={newPortfolio.name} 
          onChange={(e) => setNewPortfolio({ ...newPortfolio, name: e.target.value })}
        />
        <button onClick={handleAddPortfolio} className="add-btn">
          <FaPlusCircle /> Add Portfolio
        </button>
        <button onClick={handleDashboard}>Return To Dashboard</button>
      </div>

      {/* Portfolio List */}
      <div className="portfolio-list">
        {portfolios.map(portfolio => (
          <div key={portfolio._id} className="portfolio-card">
            <FaChartLine className="portfolio-icon" />
            <h3>{portfolio.name}</h3>
            <p>Risk Level: <strong>{portfolio.riskTolerance}</strong></p>

            {/* Fetch & Show Performance Data */}
            <button onClick={() => fetchPerformanceData(portfolio._id)} className="performance-btn">
              📊 View Performance
            </button>
            {performanceData[portfolio._id] ? (
  <div className="performance-chart">
    <h4>Performance Overview</h4>
    <p>Current Value: ${performanceData[portfolio._id].totalValue.toFixed(2)}</p>
    <Line 
      data={{
        labels: performanceData[portfolio._id].history.map(entry => new Date(entry.date).toLocaleDateString()),
        datasets: [{
          label: "Portfolio Value Over Time",
          data: performanceData[portfolio._id].history.map(entry => entry.value),
          borderColor: "#007bff",
          fill: false,
        }]
      }}
    />
  </div>
) : (
  <p>📊 Fetching performance data...</p>
)}


            {/* Asset List */}
            {editingPortfolio && editingPortfolio._id === portfolio._id ? (
              <div className="assets-edit-container">
                {editingPortfolio.assets.map((asset, index) => (
                  <div key={index} className="asset-item">
                    <input 
                      type="text" 
                      value={asset.assetName} 
                      onChange={(e) => handleAssetChange(index, "assetName", e.target.value)}
                    />
                    <input 
                      type="number" 
                      value={asset.allocation} 
                      onChange={(e) => handleAssetChange(index, "allocation", Number(e.target.value))}
                    />
                    %
                  </div>
                ))}
                <button onClick={handleSaveChanges} className="save-btn">
                  <FaSave /> Save
                </button>
              </div>
            ) : (
              <div className="assets-container">
                {portfolio.assets.map(asset => (
                  <div key={asset.assetName} className="asset-item">
                    <span>{asset.assetName} - {asset.allocation}%</span>
                  </div>
                ))}
              </div>
            )}

            <div className="portfolio-actions">
              <button onClick={() => handleEditPortfolio(portfolio)} className="edit-btn">
                <FaEdit /> Edit Assets
              </button>
              <button onClick={() => handleDeletePortfolio(portfolio._id)} className="delete-btn">
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
