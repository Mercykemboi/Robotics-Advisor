import React from "react";
import { Card, ListGroup } from "react-bootstrap";

const Watchlist = ({ stocks }) => {
  return (
    <Card className="p-3">
      <h5>Watchlist</h5>
      <ListGroup>
        {stocks.map((stock, index) => (
          <ListGroup.Item key={index}>
            <strong>{stock.name}</strong> - ${stock.price} {stock.change > 0 ? "📈" : "📉"}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
};

export default Watchlist;
