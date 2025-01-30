import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/styles/navbar.css";


const Navbar = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleLoginClick = () => {
      navigate("/login"); // Navigate to login page
    };
  
    const handleSignUpClick = () => {
      navigate("/register"); // Navigate to register page
    };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="#">RoboAdvisor</a>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links - Centered */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="#hero">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
            <li className="nav-item"><a className="nav-link" href="#features">Features</a></li>
            <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Login & Sign Up Buttons */}
        <div className="d-flex">
          <button className="btn custom-btn me-2" onClick={handleLoginClick}>Login</button>
          <button className="btn custom-btn"  onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
