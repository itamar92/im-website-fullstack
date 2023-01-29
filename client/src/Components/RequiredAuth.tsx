import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthProvider } from "../Context/AuthProvider";
import Login from "./Login/Login";

function RequiredAuth() {
  const { auth, isLoggedIn } = useAuthProvider();
  const location = useLocation();
  return (
    <div>
      {isLoggedIn ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  );
}

export default RequiredAuth;
