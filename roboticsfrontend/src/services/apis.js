import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; 

// Register User
export const registerUser = async (userData) => {
  try {
    
    const response = await axios.post(`${API_URL}/register`, userData);
    console.log(response.data)
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
      localStorage.setItem("userRole", response.data.role); // Store user role for RBAC
    }
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
