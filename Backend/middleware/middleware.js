const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token; // Retrieve token from cookies

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Role-based access
const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient privileges" });
    }
    next();
  };
};

module.exports = { protect, authorizeRoles };
