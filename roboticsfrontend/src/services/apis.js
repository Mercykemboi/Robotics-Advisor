import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const GOALS_API_URL = "http://localhost:5000/api/financial-goals";

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
      if (response.data.profileImage) {
        localStorage.setItem("profileImage", response.data.profileImage); // ✅ Save profile image
      }
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

export const updateUserProfile = async (updatedData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please log in.");

    const formData = new FormData();
    formData.append("username", updatedData.username);
    
    if (updatedData.profileImage) {
      formData.append("profileImage", updatedData.profileImage); // ✅ Append image file
    }

    console.log("📌 Sending FormData:", formData);

    const response = await axios.put(
      "http://localhost:5000/api/auth/profile", 
      formData,
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ API Response:", response.data);
    return response.data.user;

  } catch (error) {
    console.error("❌ Error updating user profile:", error);
    throw error.response?.data?.message || "Failed to update user profile.";
  }
};



// ✅ Create a New Financial Goal
export const createFinancialGoal = async (goalData) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(GOALS_API_URL, goalData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Get All Financial Goals
export const getFinancialGoals = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(GOALS_API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Update a Financial Goal
export const updateFinancialGoal = async (goalId, updatedData) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(`http://localhost:5000/api/financial-goals/${goalId}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(updatedData);
  return response.data;
};


// ✅ Delete a Financial Goal
export const deleteFinancialGoal = async (goalId) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(`${GOALS_API_URL}/${goalId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};