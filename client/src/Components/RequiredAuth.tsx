import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthProvider } from "../Context/AuthProvider";

type rolesProps = {
  allowedRoles: string[];
};

function RequiredAuth({ allowedRoles }: rolesProps) {
  const { isLoggedIn, role } = useAuthProvider();
  const location = useLocation();

  const areAuthorized = (role: string[], roleGiven: string[]): boolean => {
    return role.some((name) => roleGiven.includes(name));
  };
  return (
    <div>
      {areAuthorized(allowedRoles, role as string[]) ? (
        <Outlet />
      ) : isLoggedIn ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  );
}

export default RequiredAuth;
