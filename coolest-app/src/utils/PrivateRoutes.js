import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/graphql", { withCredentials: true })
      .then((response) => {
        console.log(response.headers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
