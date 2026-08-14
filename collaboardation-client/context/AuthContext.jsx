import { createContext, useState, useEffect } from "react"
import api, { clearCsrfToken } from "../src/api/axiosInstance"

const AuthContext = createContext()

const AuthProvider = ( { children } ) => {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await api.get("/users/me")
                setUser(response.data.data.safeUser)
            } catch (error) {
                console.error("No active session found")
                setUser(null)
            }finally {
                setAuthLoading(false)
            }
        }
        checkAuth()
    }, []);
    

    const login = (user) => { 
        setUser(user)
    }

    const logout = async () => {
        try {
            await api.post("/users/logout")

            clearCsrfToken()
            
        } catch (error) {
            console.error("Logout failed", error)
        }finally{
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, authLoading }}>
            {children}
        </AuthContext.Provider>
    )
}
    
export default AuthProvider;
export { AuthContext }
