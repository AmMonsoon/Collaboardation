import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
    const { token } = useAuth()
    

    if(!token) return <Navigate to= "/login" replace />

    return <Outlet />
}

export default RequireAuth;