import React from "react";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa"; // Icons
import "./styles/TopBar.css"; // Custom styles

const TopBar = () => {
  return (
    <div className="topbar">
      <h2 className="topbar-title"></h2>
      <div className="topbar-icons">
        <FaBell className="icon" />
        <FaCog className="icon" />
        <div className="user-profile">
          <FaUserCircle className="user-icon" />
          <span className="username">Jerry Warren</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
