import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate } from "react-router-dom";
import "./styles/Register.css" // Import styles

const Register = () => {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate("/login"); // Navigate to login page
      };
      const handleBackHome = () => {
        navigate("/"); // Navigate to login page
      };
  return (
    <div className="register-container">
      <div className="register-box">
        {/* Left Section: Form */}
        <div className="register-form">
          <h2>✨ Sign Up</h2>

          {/* Input Fields */}
          <input type="text" placeholder="Your Name" className="input-field" />
          <input type="email" placeholder="Your E-mail" className="input-field" />
          <input type="password" placeholder="Password At least 8 characters" className="input-field" />

          {/* Terms Checkbox */}
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to all the <span className="link">Terms, Privacy Policy, and Fees.</span>
            </label>
          </div>

          {/* Continue Button */}
          <button className="continue-btn">Continue</button>

          {/* Login Link */}
          <p className="login-text"> Already
            Have an account? <span className="link" onClick={handleLoginClick}>Log in</span>
          </p>
          <button className="login-text" onClick={handleBackHome}>Back Homepage</button>
        </div>

        {/* Right Section: Image & Text */}
        <div className="register-info">
          <div className="graph-box">
            <h4>Deals Closed vs Goal 📈</h4>
            {/* Placeholder Graph Image */}
            <img src="images/graphs.png" alt="Graph" />
          </div>
          
        
        </div>
      </div>
    </div>
  );
};

export default Register;
