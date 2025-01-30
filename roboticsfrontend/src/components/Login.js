import React,{useState} from  "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Login.css" // Import styles
import {useNavigate} from "react-router-dom";
import { loginUser } from "../services/apis";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({email: "", password: ""});
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await loginUser(formData);
      console.log("login successfully");
      navigate("/dashboard"); // Redirect after successful registration
    } catch (err) {
      setError(err);
    }
  };

 
      const handleBackHome = () => {
        navigate("/"); // Navigate to login page
      };
  return (
    <div className="Login-container">
      <div className="Login-box">
        {/* Left Section: Form */}
        <div className="Login-form">
          <h2>✨ Log In</h2>

          {/* Input Fields */}
          <input type="text" name="email" placeholder="Your E-mail" className="input-field" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password At least 10 characters" className="input-field" onChange={handleChange} />

          {/* Continue Button */}
          <button className="login-btn" onClick={handleLoginClick}>Login</button>

          <button className="login-text" onClick={handleBackHome}>Back Homepage</button>

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
