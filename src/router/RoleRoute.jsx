import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ children, role }) {
  const { user } = useAuth();

  // If not authenticated, send to login
  if (!user) return <Navigate to="/login" replace />;
  // If role mismatch, treat as unauthorized and send to login
  if (user.role !== role) return <Navigate to="/login" replace />;

  return children;
}
