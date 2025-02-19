import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  const userRole = localStorage.getItem("userRole"); // Get stored role

  return userRole === requiredRole ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
