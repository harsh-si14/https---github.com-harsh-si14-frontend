import React, { useState } from 'react';
import { Link  , useNavigate} from 'react-router-dom'
import axios from 'axios';
import './register.css';
import {  FaEnvelope,  FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';




const Register = () => {
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
 
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false); 
  const navigate = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();
    axios.post(`http://localhost:6005/register`, { name, email, password })
      .then(result => {
        navigate("/")
        alert('You are registered !'); 
        
        setname('');
        setPassword(''); 
        setEmail('');
      })
      .catch(err => console.log(err));
  };
  
  const loginwithgoogle = ()=>{
    window.open(`http://localhost:6005/auth/google/callback`,"_self")
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordTextVisibility = () => {
    setShowPasswordText(!showPasswordText);
  };


  return (

    <div className={'wrapper'}>
      <div className='form-box registration'>
      <form onSubmit={handleregister}>
        <h1>REGISTER</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaEnvelope className="icon" />
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
        <button type="submit">Register</button>
        <div className="register-link">
        <p>
          Already Have Account ? <Link to="/">Log In</Link>
        </p>
        </div>
        <button className='login-with-google-btn' onClick={loginwithgoogle}>
                    Sign In With Google
          </button>
        
      </form>
    </div>
    </div>
    
  )
}

export default Register