import React,{useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";
import { registerUser } from "../services/apis";
import "./styles/Register.css" // Import styles

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", email: "", password: "",role:"user"});
    const [error, setError] = useState(null);
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await registerUser(formData);
      console.log("registered");
      navigate("/login"); // Redirect after successful registration
    } catch (err) {
      setError(err);
    }
  };

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
          <input type="text" name="username" placeholder="Your Name" className="input-field" onChange={handleChange} />
          <input type="email" name="email" placeholder="Your E-mail" className="input-field" onChange={handleChange}/>
          <input type="password" name="password" placeholder="Password" className="input-field" onChange={handleChange}/>
              
              {/* Role Selection */}
          {/* <select name="role" className="input-field" onChange={handleChange} value={formData.role}>
            <option value="user">User</option>
            <option value="admin">Admin</option> 
          </select> */}
          {/* Terms Checkbox */}
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to all the <span className="link">Terms, Privacy Policy, and Fees.</span>
            </label>
          </div>

          {/* Continue Button */}
          <button className="continue-btn" onClick={handleSubmit}>Continue</button>

          {/* Login Link */}
          <p className="login-text"> Already
            Have an account? <span className="link" onClick={handleLoginClick}>Log in</span>
          </p>
          
          <button  onClick={handleBackHome}>Back Homepage</button>
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
