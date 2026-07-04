import { useState } from "react";
import { registerUser } from "../../api/userApi";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "./SignUpPage.css"

const SignUpPage = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate();

     const handleSubmit = async(e) => {
        e.preventDefault()      // prevents the page from reloading
        
        let valid = true;
        
        setEmailError('')
        setPasswordError('')
        
        if(!email.trim()){
            setEmailError("Email is required")
            valid = false;
        }
        
        if(!password.trim()){
            setPasswordError("Password is required")
            valid = false;
        }

        if(!username.trim()){
            setUsernameError("Username is required")
            valid = false;
        }
        
        if(!valid) return;

        try {
            const data = await registerUser( {username, email, password})
            login(data.user, data.token)
            navigate("/")
        } catch (error) {
            console.error("Sign up Failed",  error)
        }

    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    return(
    <div className="sign-up-container">
        <form onSubmit={handleSubmit}>
        <img 
        src="/collaboardation-logo.png"
        alt="Collaboardation logo"
        className="app-logo"
        />
        <p className="login-tagline">
                Manage projects. Organize tasks. Collaborate.
        </p>
        
            <label className="username">Username:
                <input type="username" value={username} onChange={handleUsernameChange}/>
                {usernameError &&  <p className="error-text" style= {{color: "red"}}>{usernameError}</p>}
            </label>
            <label className="email">Email:
                <input type="email" value={email} onChange={handleEmailChange}/>
                {emailError &&  <p className="error-text" style= {{color: "red"}}>{emailError}</p>}
            </label>
            <label className="create-password">Password:
                <input type="password" value={password} onChange={handlePasswordChange}/>
                {passwordError &&  <p className="error-text" style= {{color: "red"}}>{passwordError}</p>}
            </label>
            <button type="submit">Submit</button>
            <div className="sign-up-form-link-container">
                <span>Already have an account? </span>
                <Link className="sign-up-form-link" to="/login">Log in</Link>
            </div>
        </form>
    </div>
    );
}

export default SignUpPage;