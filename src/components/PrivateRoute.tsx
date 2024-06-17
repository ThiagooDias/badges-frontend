import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
