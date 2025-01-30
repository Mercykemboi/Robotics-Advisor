import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const StockSectors = ({ sectors }) => {
  return (
    <Row>
      {sectors.map((sector, index) => (
        <Col key={index} md={3}>
          <Card className="p-3 text-center">
            <h5>{sector.name}</h5>
            <p>{sector.stocks} Stocks</p>
            <h3>${sector.value}</h3>
            <p className={sector.change > 0 ? "text-success" : "text-danger"}>
              {sector.change}%
            </p>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default StockSectors;
