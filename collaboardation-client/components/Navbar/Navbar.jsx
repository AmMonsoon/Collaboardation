import { Link } from "react-router-dom"
import "./Navbar.css";
const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="navbar_logo">
                Collaboardation
            </div>
            
            <div className="navbar_links">
                <Link to="/login" className="navbar_link">Login</Link>
                <span className="navbar_divider">/</span>
                <Link to="/register" className="navbar_link navbar_link--primary">Register</Link>
            </div>
        </nav>
    )
}

export default Navbar;