import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/Homepage";
import TopBar from "./components/topbar";
import PortfolioCard from "./components/portfolioCard";
import UserProfile from "./components/userprofile";
import FinancialGoals from "./components/financialGoal";
import RiskTolerance from "./components/Risk";


const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();

  // ✅ Show Navbar + LandingPage ONLY on `/`
  if (location.pathname === "/") {
    return <LandingPageLayout />;
  }

  // ✅ Show Dashboard Layout for `/dashboard`
  if (location.pathname.startsWith("/dashboard")) {
    return <DashboardLayout />;
  }

  // ✅ Show Other Pages Separately (Login, Register, Profile, etc.)
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/risk" element ={<RiskTolerance/>}/>
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/financials" element={<FinancialGoals />} />
      <Route path="/portfolio" element={<PortfolioCard />} />
    </Routes>
  );
};

// ✅ Landing Page Layout
const LandingPageLayout = () => (
  <>
    <Navbar />
    <LandingPage />
  </>
);

// ✅ Dashboard Layout (Sidebar + TopBar)
const DashboardLayout = () => (
  <div className="dashboard-layout">
    <Sidebar />
    <div className="dashboard-content">
      <TopBar />
      <div className="content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  </div>
);

export default App;
