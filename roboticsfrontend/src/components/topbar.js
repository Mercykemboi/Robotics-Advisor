import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaCog } from "react-icons/fa"; 
import "./styles/TopBar.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TopBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest");
  const [profileImage, setProfileImage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setProfileImage(localStorage.getItem("profileImage") || "/images/default-avatar.png");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const token = localStorage.getItem("token");
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

    // Auto refresh notifications every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  const handleNotification = () => {
    navigate("/notifications");
  };

  return (
    <div className="topbar">
      <h2 className="topbar-title">Welcome, {username} 👋</h2>
      <div className="topbar-icons">
        {/* Notification Bell with Count Badge */}
        <div className="notification-wrapper" onClick={handleNotification}>
          <FaBell className="icon" />
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </div>

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
