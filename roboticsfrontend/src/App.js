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

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();
  
  // Check if the current route is the dashboard (or sub-pages within it)
  const isDashboardPage = location.pathname.startsWith("/dashboard");


  return (
    
    <div className="app-container">
      {/* Show Navbar only on the Landing Page ("/") */}
      
      {!isDashboardPage && <Navbar />}
      {/* Dashboard Layout (Sidebar + TopBar) */}
      {isDashboardPage && (
        <div className="dashboard-layout">
          <Sidebar />
          <div className="dashboard-content">
            <TopBar /> {/* Keep TopBar inside the dashboard layout */}
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </div>
        </div>
      )}

      {/* Routes outside the Dashboard */}
      {!isDashboardPage && (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio" element={<PortfolioCard />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
