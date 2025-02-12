import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/TopBar.css"; 

const TopBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");
  const [profileImage, setProfileImage] = useState("/images/default-avatar.png");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedProfileImage = localStorage.getItem("profileImage");
    
    if (storedUsername) setUsername(storedUsername);
    if (storedProfileImage) setProfileImage(storedProfileImage);
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const unread = response.data.filter((notif) => !notif.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <div className="topbar">
      <h2 className="topbar-title">Welcome, {username} 👋</h2>
      
      <div className="topbar-icons">
        {/* 🔔 Notification Bell */}
        <div className="notification-wrapper" onClick={() => navigate("/notifications")}>
          <FaBell className="icon" />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </div>

        {/* ⚙️ Settings */}
        <div className="settings-wrapper" onClick={() => navigate("/settings")}>
          <FaCog className="icon" />
        </div>

        {/* 👤 User Profile */}
      
        <div className="user-profile" onClick={handleProfileClick}>
          <FaUserCircle className="user-icon" />
          <span className="username">{username}</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
