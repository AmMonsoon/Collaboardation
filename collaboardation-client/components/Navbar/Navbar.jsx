import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css";
import { useAuth } from "../../hooks/useAuth";
const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    
    const handleLogout = async () => {
        await logout()
        navigate("/login")
    }

    return(
        <nav className="navbar">
            <div className="navbar_logo">
                Collaboardation
            </div>
            
            <div className="navbar_links">
                {
                user
                ? (<button onClick={handleLogout}>Logout</button>) 
                :(
                <>
                    <Link to="/login" className="navbar_link">Login</Link>
                    <span className="navbar_divider">/</span>
                    <Link to="/register" className="navbar_link navbar_link--primary">Register</Link>
                </>
            )}
            </div>
        </nav>
    )
}

export default Navbar;