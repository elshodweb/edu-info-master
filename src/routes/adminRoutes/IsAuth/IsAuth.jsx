import React from "react";
import "./IsAuth.scss";
import { Navigate, Outlet } from "react-router-dom";
function IsAuth({ isAuth, verifyToken }) {
  verifyToken();
  if (isAuth) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default IsAuth;
