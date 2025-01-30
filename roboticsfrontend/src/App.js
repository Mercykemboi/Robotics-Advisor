import React from "react";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Navbar from "../src/components/NavBar";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import LandingPage from "../src/pages/Homepage";


const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation(); 

  return (
    <>
      {/* Show Navbar only on the Landing Page ("/") */}
      {location.pathname === "/" && <Navbar />}  

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;