import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token
        const response = await axios.get("http://localhost:5000/api/notifications", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNotifications(response.data);

        // ✅ Count unread notifications
        const unread = response.data.filter((notif) => !notif.read).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Notifications</h2>
      <ul className="list-group">
        {notifications.length === 0 ? (
          <li className="list-group-item">No notifications</li>
        ) : (
          notifications.map((notification) => (
            <li key={notification._id} className="list-group-item">
              {notification.message}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
