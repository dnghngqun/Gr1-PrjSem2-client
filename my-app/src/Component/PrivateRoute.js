import React from "react";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ element, isLoggedIn, allowedRoles }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (!allowedRoles.includes(isLoggedIn.data.role)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
