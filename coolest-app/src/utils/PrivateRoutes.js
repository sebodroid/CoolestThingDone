import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  let auth = { isAuthenticated: localStorage.getItem("token") !== null };
  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
