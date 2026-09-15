import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * AgentProtectedRoute — guards all /agent/... routes
 * Redirects to /agent/login if not authenticated as an agent.
 */
const AgentProtectedRoute = () => {
  const userStr = localStorage.getItem("user");
  let isAgent = false;

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user?.type === "agent") {
        isAgent = true;
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
    }
  }

  return isAgent ? <Outlet /> : <Navigate to="/agent/login" replace />;
};

export default AgentProtectedRoute;
