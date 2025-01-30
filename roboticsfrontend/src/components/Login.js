import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Login.css" // Import styles

const Login = () => {
  return (
    <div className="Login-container">
      <div className="Login-box">
        {/* Left Section: Form */}
        <div className="Login-form">
          <h2>✨ Log In</h2>

          {/* Input Fields */}
          <input type="text" placeholder="Your Name" className="input-field" />
          <input type="password" placeholder="Password At least 8 characters" className="input-field" />

          {/* Continue Button */}
          <button className="login-btn">Login</button>

        

        
        </div>

        {/* Right Section: Image & Text */}
        <div className="Login-info">
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

export default Login;
