import React from "react";
import { Card } from "react-bootstrap";

const PortfolioCard = ({ balance, profit, growth, bestStock }) => {
  return (
    <Card className="p-3">
      <h5>Portfolio Value</h5>
      {/* //<h3>${balance.toLocaleString()}</h3> */}
      <p>Your profit is <span className="text-success">${profit}</span> ({growth}%)</p>
      <p>Best Profit Stock: <strong>{bestStock}</strong></p>
    </Card>
  );
};

export default PortfolioCard;
