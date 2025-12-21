import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    const dest = user.role === "admin" ? "/admin/dashboard" : "/student/dashboard";
    return <Navigate to={dest} replace />;
  }

  return children;
}
