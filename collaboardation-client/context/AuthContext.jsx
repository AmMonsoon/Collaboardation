import { createContext, useState, useEffect } from "react"

const AuthContext = createContext()

const AuthProvider = ( { children } ) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const jwtToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (jwtToken) setToken(jwtToken);
        if (storedUser && storedUser !== "undefined"){
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user", err)
                localStorage.removeItem("user")
            }

        } 
    }, []);
    

    const login = (user, token) => {
        setToken(token)
        setUser(user)
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        console.log(user)
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
export { AuthContext }
