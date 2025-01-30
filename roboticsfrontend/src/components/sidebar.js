import React from "react";
import { ListGroup } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-3">
      <ListGroup>
        <ListGroup.Item active>Dashboard</ListGroup.Item>
        <ListGroup.Item>Portfolio</ListGroup.Item>
        <ListGroup.Item>My Stock</ListGroup.Item>
        <ListGroup.Item>Deposit</ListGroup.Item>
        <ListGroup.Item>Insight</ListGroup.Item>
        <ListGroup.Item>Market Stock</ListGroup.Item>
        <ListGroup.Item>Market Bitcoin</ListGroup.Item>
        <ListGroup.Item>News Update</ListGroup.Item>
        <ListGroup.Item>Help Center</ListGroup.Item>
        <ListGroup.Item>Settings</ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
