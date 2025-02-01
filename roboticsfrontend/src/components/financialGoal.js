import React, { useState, useEffect } from "react";
import { createFinancialGoal, getFinancialGoals, updateFinancialGoal, deleteFinancialGoal } from "../services/apis";
import "./styles/FinancialGoals.css"; 
import { useNavigate } from "react-router-dom";

const FinancialGoals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: "", targetAmount: "", deadline: "" });
  const [editingGoal, setEditingGoal] = useState(null); // ✅ Track which goal is being edited

  useEffect(() => {
    getFinancialGoals().then(setGoals);
  }, []);

  const handleChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  const handleAddGoal = async () => {
    const addedGoal = await createFinancialGoal(newGoal);
    setGoals([...goals, addedGoal]);
    setNewGoal({ title: "", targetAmount: "", deadline: "" });
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal); // ✅ Load goal into edit form
  };

  const handleUpdateGoal = async () => {
    if (!editingGoal) return;
    const updatedGoal = await updateFinancialGoal(editingGoal._id, editingGoal);
    setGoals(goals.map(goal => (goal._id === editingGoal._id ? updatedGoal : goal)));
    setEditingGoal(null); // ✅ Clear editing state
  };

  const handleDeleteGoal = async (goalId) => {
    await deleteFinancialGoal(goalId);
    setGoals(goals.filter(goal => goal._id !== goalId));
  };
  const handleDashboard = () =>
  {
    navigate('/dashboard');
  }

  return (
    <div className="financial-goals-container">
      <h2>📊 Financial Goals</h2>
      <button onClick={handleDashboard}>Back Home</button>

      {/* Goal Input Form */}
      <div className="goal-form">
        <input type="text" name="title" value={newGoal.title} onChange={handleChange} placeholder="🎯 Goal Title" />
        <input type="number" name="targetAmount" value={newGoal.targetAmount} onChange={handleChange} placeholder="💰 Target Amount ($)" />
        <input type="date" name="deadline" value={newGoal.deadline} onChange={handleChange} />
        <button onClick={handleAddGoal} className="add-goal-btn">➕ Add Goal</button>
      </div>

      {/* Edit Form */}
      {editingGoal && (
        <div className="edit-form">
          <h3>✏️ Edit Goal</h3>
          <input type="text" name="title" value={editingGoal.title} onChange={(e) => setEditingGoal({ ...editingGoal, title: e.target.value })} />
          <input type="number" name="targetAmount" value={editingGoal.targetAmount} onChange={(e) => setEditingGoal({ ...editingGoal, targetAmount: e.target.value })} />
          <input type="date" name="deadline" value={editingGoal.deadline} onChange={(e) => setEditingGoal({ ...editingGoal, deadline: e.target.value })} />
          <button onClick={handleUpdateGoal} className="update-btn">💾 Save Changes</button>
          <button onClick={() => setEditingGoal(null)} className="cancel-btn">❌ Cancel</button>
        </div>
      )}

      {/* Goal List */}
      <div className="goal-list">
        {goals.map(goal => (
          <div key={goal._id} className="goal-card">
            <h3>{goal.title}</h3>
            <p>🎯 Target: ${goal.targetAmount}</p>
            <p>📅 Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>

            {/* Progress Bar */}
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
              ></div>
            </div>
            <p>💸 Saved: ${goal.currentAmount} / ${goal.targetAmount}</p>

            {/* Goal Actions */}
            <div className="goal-actions">
              <button onClick={() => handleEditGoal(goal)}>✏️ Edit</button>
              <button onClick={() => handleDeleteGoal(goal._id)} className="delete-btn">🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialGoals;
