import React, { useState } from 'react';
import axios from 'axios';
import './Loginform.css';
import {  FaEnvelope,  FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link , useNavigate} from 'react-router-dom'


const Loginform = () => {

  const [password, setPassword] = useState('');

  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`https://https-github-com-harsh-si14-loginbackend.vercel.app/signin`, { email, password })
      .then(result => {
        navigate("/get")
        alert('You are logged in!'); 
        setEmail('');
        setPassword(''); 
      })
      .catch(err => console.log(err));
  };
  
  
  

  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /[0-9]/.test(newPassword);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(newPassword);
    
    if (
      newPassword.length < minLength ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasNumbers ||
      !hasSpecialChars
    ) {
      setPasswordError("Password must be 8+ characters with uppercase, lowercase, number, and special character.");
    } else {
      setPasswordError('');
    }

  };
  
  const loginwithgoogle = ()=>{
    window.open(`https://https-github-com-harsh-si14-loginbackend.vercel.app/auth/google/callback`,"_self")
};
const togglePasswordVisibility = () => {
  setShowPassword(!showPassword);
};
const togglePasswordTextVisibility = () => {
  setShowPasswordText(!showPasswordText);
};



  return (
    <div className={'wrapper'}>
      <div className="form-box login">
        <form onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
          <div className="input-box">
          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <FaEnvelope className="icon" />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            
            {showPassword ? (
              <FaEyeSlash className="icon password-toggle" onClick={() => { togglePasswordVisibility(); togglePasswordTextVisibility(); }} />
            ) : (
              <FaEye className="icon password-toggle" onClick={() => { togglePasswordVisibility(); togglePasswordTextVisibility(); }} />
            )}
          </div>
          {passwordError && <p className="password-error">{passwordError}</p>}
          {showPasswordText && <p className="password-text">{password}</p>}
          <button type="submit" >Login</button>
          <div className="register-link">
          <p>Don't have an account? <Link to={"/register"}>Register Now</Link></p>
          </div>
          <button className='login-with-google-btn' onClick={loginwithgoogle}>
                    Sign In With Google
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default Loginform;
