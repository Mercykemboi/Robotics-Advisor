import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa"; 
import "./styles/TopBar.css"; 
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);


  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <div className="topbar">
      <h2 className="topbar-title">Welcome, {username} 👋</h2>
      <div className="topbar-icons">
        <FaBell className="icon" />
        <FaCog className="icon" />
        <div className="user-profile" onClick={handleProfileClick}>
          <FaUserCircle className="user-icon" />
          <span className="username">{username}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
