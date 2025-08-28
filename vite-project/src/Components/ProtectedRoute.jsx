import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If roles are defined and user role is not allowed, deny access
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <p className="text-center text-red-600 font-semibold mt-10">Access Denied</p>;
  }

  return children;
};

export default ProtectedRoute;
