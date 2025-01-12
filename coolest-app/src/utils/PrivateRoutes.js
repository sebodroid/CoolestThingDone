import { Outlet, Navigate } from "react-router-dom";
import { useState } from "react";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
