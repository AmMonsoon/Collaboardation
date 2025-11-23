import "./Navbar.css";

const Navbar = () => {
    return(
        <nav className="navbar">
            <div className="navbar_logo">
                Collaboardation
            </div>
            
            <div className="navbar_links">
                <a href="#" className="navbar_link">Login</a>
                <span className="navbar_divider">/</span>
                <a href="#" className="navbar_link navbar_link--primary">Register</a>
            </div>
        </nav>
    )
}

export default Navbar;