import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed!";
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
    }
    console.log(response.data.username);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed!";
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
};

// Get Current User Role
export const getUserRole = () => {
  return localStorage.getItem("userRole");
};

// ✅ Fetch Logged-in User Profile
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in.");

    const response = await axios.get("http://localhost:5000/api/auth//profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; 

  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error.response?.data?.message || "Failed to fetch user profile.";
  }
};

// ✅ Update User Profile
export const updateUserProfile = async (updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in.");

    const response = await axios.put("http://localhost:5000/api/auth/profile", updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ Update localStorage with new username if changed
    console.log(updatedData.username);
    if (updatedData.username) {
      localStorage.setItem("username", updatedData.username);
    }
    return response.data; // ✅ Updated user data
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error.response?.data?.message || "Failed to update user profile.";
  }
};