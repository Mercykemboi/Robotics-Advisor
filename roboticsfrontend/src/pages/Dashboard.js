import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/sidebar";
import PortfolioCard from "../components/portfolioCard";
import MarketChart from "../components/MarketChart";
import Watchlist from "../components/WatchList";
import StockSectors from "../components/stocksector";
import InvestmentTable from "../components/investmenttable";
import axios from "axios";

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState({});
  const [marketData, setMarketData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    axios.get("/api/dashboard").then((res) => {
      setPortfolio(res.data.portfolio);
      setMarketData(res.data.marketData);
      setStocks(res.data.watchlist);
      setSectors(res.data.sectors);
      setInvestments(res.data.investments);
    });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={2}><Sidebar /></Col>
        <Col md={10}>
          <PortfolioCard {...portfolio} />
          <MarketChart data={marketData} />
          <Watchlist stocks={stocks} />
          <StockSectors sectors={sectors} />
          <InvestmentTable investments={investments} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
