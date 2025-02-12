const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Default role is 'user'
  riskTolerance: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  active: {
    type: Boolean,
    default: true,  // Default is active
  },
});

module.exports = mongoose.model("User", UserSchema);
