import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/apis"; // ✅ Import API functions
import "../components/styles/userprofile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    getUserProfile()
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleBackHome = () => {
    navigate("/"); // Navigate to login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      await updateUserProfile(user);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>

      {message && <p className="message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={user.username} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} disabled />

        <button type="submit" onClick={handleBackHome}>Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
