import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;