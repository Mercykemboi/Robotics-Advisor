import React, { useState } from "react";
import "./styles/userprofile.css"; // Custom styles

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john@example.com",
    financialGoal: "Retirement",
    riskTolerance: "Moderate",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="profile-container">
      <h2>👤 User Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} disabled />

        <label>Financial Goal</label>
        <select name="financialGoal" value={formData.financialGoal} onChange={handleChange}>
          <option value="Retirement">Retirement</option>
          <option value="Education">Education</option>
          <option value="Investment">Investment</option>
        </select>

        <label>Risk Tolerance</label>
        <select name="riskTolerance" value={formData.riskTolerance} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default UserProfile;
