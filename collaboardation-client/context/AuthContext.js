import { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

const AuthProvider = () => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const jwtToken = localStorage.getItem("token")
        if(jwtToken){
            setToken(jwtToken)
        }
    })

    const login = (user, token) => {
        setToken(token)
        setUser(user)
        localStorage.setItem("token", token)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
    
export default AuthProvider;

