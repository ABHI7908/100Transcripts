import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const userStr = localStorage.getItem("user");
  let isAdmin = false;

  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      // The backend returns { type: "admin", data: { email: "..." } } on login.
      // We check for type === "admin" or if the email ends with @admin.org to match login logic.
      if (
        user?.type === "admin" || 
        user?.data?.email?.endsWith("@admin.org") || 
        user?.email?.endsWith("@admin.org")
      ) {
        isAdmin = true;
      }
    } catch (e) {
      console.error("Failed to parse user data", e);
    }
  }

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminProtectedRoute;
