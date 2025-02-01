import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/apis"; // ✅ API functions
import "../components/styles/userprofile.css";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", profileImage: "" });
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        setUser(data);
        setImagePreview(data.profileImage ? `http://localhost:5000${data.profileImage}` : "/images/default-avatar.png"); // ✅ Fix image loading
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setSelectedFile(file);
      setUser((prevUser) => ({ ...prevUser, profileImage: file })); // ✅ Store file object
      setImagePreview(URL.createObjectURL(file)); // ✅ Show preview
      console.log("📌 Selected Image:", file.name);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.username) {
        console.error("Username is missing!");
        setMessage("Username is required.");
        return;
      }
  
      const updatedData = {
        username: user.username,
        profileImage: selectedFile || user.profileImage, // ✅ Send correct image file
      };
      console.log(user.username,selectedFile);
  
      console.log("Sending JSON:", updatedData); // ✅ Debug payload
  
      await updateUserProfile(updatedData);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Error updating profile.");
    }
  };

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>

      {message && <p className="message">{message}</p>}

      <div className="profile-picture">
        <img src={imagePreview} alt="Profile" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" name="username" value={user.username} onChange={handleChange} />

        <label>Email:</label>
        <input type="email" name="email" value={user.email} disabled />

        <button type="submit">Update Profile</button>
      </form>

      <button className="back-btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default UserProfile;
