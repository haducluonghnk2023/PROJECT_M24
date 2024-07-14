import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminToken"); // Hoặc trạng thái đăng nhập từ redux

  return isAuthenticated ? <>{children}</> : <Navigate to="/login/admin" />;
};

export default PrivateRoute;
