import { useState } from "react";
import "./LoginPage.css"
import { loginUser } from "../../api/userApi";

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password,  setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

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
        
        if(!valid) return;

        try {
            const data =  await loginUser({ email, password })
            console.log("Login response", data)
        } catch (error) {
            console.error("Login Failed", error)
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
            <label className="email">Email:
                <input type="email" value={email} onChange={handleEmailChange}/>
                {emailError &&  <p className="error-text" style= {{color: "red"}}>{emailError}</p>}
            </label>
            <label className="password">Password:
                <input type="password" value={password} onChange={handlePasswordChange}/>
                {passwordError &&  <p className="error-text" style= {{color: "red"}}>{passwordError}</p>}
            </label>
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default LoginPage;