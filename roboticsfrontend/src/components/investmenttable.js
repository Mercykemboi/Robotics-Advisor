import React from "react";
import { Table } from "react-bootstrap";

const InvestmentTable = ({ investments }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name Stock</th>
          <th>Invest Date</th>
          <th>Volume</th>
          <th>Price/Stock</th>
          <th>Change</th>
          <th>Lots</th>
        </tr>
      </thead>
      <tbody>
        {investments.map((investment, index) => (
          <tr key={index}>
            <td>{investment.name}</td>
            <td>{investment.date}</td>
            <td>{investment.volume}B</td>
            <td>${investment.price}</td>
            <td className={investment.change > 0 ? "text-success" : "text-danger"}>
              {investment.change}%
            </td>
            <td>{investment.lots} Lots</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InvestmentTable;
