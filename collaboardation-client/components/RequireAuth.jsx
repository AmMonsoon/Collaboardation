import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const RequireAuth = ( { children } ) => {
    const { token } = useAuth()
    

    if(!token) return <Navigate to= "/login" replace />

    return children
}

export default RequireAuth;