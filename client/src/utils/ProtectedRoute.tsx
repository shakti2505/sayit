import React from "react";
import { Navigate } from "react-router-dom";
// import { useUser } from "./criticalState";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
