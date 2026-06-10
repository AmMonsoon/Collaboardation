import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"
import { loginUser } from "../../api/userApi";
import { useAuth } from "../../../hooks/useAuth";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password,  setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError,  setLoginError] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()      // prevents the page from reloading
        
        let valid = true;
        
        setEmailError('')
        setPasswordError('')
        setLoginError('')
        
        if(!email.trim()){
            setEmailError("Email is required")
            valid = false;
        }
        
        if(!password.trim()){
            setPasswordError("Password is required")
            valid = false;
        }
        
        if(!valid) return;

        try {
            const data =  await loginUser( {email, password})
            login(data.data.safeUser)
            navigate("/")
        } catch (error) {
            console.error("Login Failed", error)
            setLoginError("Invalid Email or Password")
        }
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return(
        <div className="login-container">
        <h1 className="login-title"> Login Page</h1>
        <form onSubmit={handleSubmit}>
            {loginError &&  <p className="error-text" style= {{color: "red"}}>{loginError}</p>}
            <label className="email">Email:
                <input data-testid="email-input" type="email" value={email} onChange={handleEmailChange}/>
                {emailError &&  <p className="error-text" style= {{color: "red"}}>{emailError}</p>}
            </label>
            <label className="password">Password:
                <input data-testid="password-input" type="password" value={password} onChange={handlePasswordChange}/>
                {passwordError &&  <p className="error-text" style= {{color: "red"}}>{passwordError}</p>}
            </label>
            <button data-testid="login-button" type="submit">Log In</button>
        </form>
        </div>
    );
}

export default LoginPage;