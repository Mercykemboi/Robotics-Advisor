import React, { useState, useEffect } from "react";
import { getRiskTolerance, updateRiskTolerance } from "../services/apis";
import "../components/styles/RiskTolerance.css";
import { useNavigate } from "react-router-dom";

const RiskTolerance = () => { 
  const navigate = useNavigate();
  const [riskTolerance, setRiskTolerance] = useState("Medium");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getRiskTolerance()
      .then((data) => setRiskTolerance(data.riskTolerance))
      .catch((error) => console.error("Error fetching risk tolerance:", error));
  }, []);

  const handleRiskChange = async (newRisk) => {
    try {
      await updateRiskTolerance(newRisk);
      setRiskTolerance(newRisk);
      setMessage("✅ Risk tolerance updated successfully!");
    } catch (error) {
      setMessage("❌ Error updating risk tolerance.");
    }
  };

  const handleDashboard = () =>
  {
     navigate("/dashboard")
  }

  return (
    <div className="risk-tolerance-container">
      <h2>⚖️ Risk Tolerance</h2>
      <p>Choose your risk level to personalize investment recommendations.</p>

      <div className="risk-buttons" onClick={handleDashboard}>
        <button 
          className={riskTolerance === "Low" ? "selected" : ""}
          onClick={() => handleRiskChange("Low") }
        >
          🟢 Low
        </button>
        <button 
          className={riskTolerance === "Medium" ? "selected" : ""}
          onClick={() => handleRiskChange("Medium")}
        >
          🟡 Medium
        </button>
        <button 
          className={riskTolerance === "High" ? "selected" : ""}
          onClick={() => handleRiskChange("High")}
        >
          🔴 High
        </button>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RiskTolerance;
