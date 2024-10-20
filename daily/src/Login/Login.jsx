import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom';

import './Login.css';  // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      axios.post('http://localhost:3001/api/auth/login', { email, password })
        .then(result => {
          console.log(result);

          if (result.data.message === 'Login successful') {
            localStorage.setItem('token', result.data.token);

            if (email === 'akhilaugustine2025@mca.ajce.in') {
              navigate('/dashboard');
            } else {
              navigate('/udashboard');
            }
          } else {
            setErrorMessage(result.data.message); 
          }
        })
        .catch(error => {
          console.log(error);
          setErrorMessage('No user with the username/password'); 
        });
    } else {
      setErrorMessage('Please fix the errors before submitting.');
    }
  };

 

  return (
    <div className="bg-image">
      <div className="container">
        <div className="left-section">
          {/* Left section content */}
        </div>
        <div className="right-section">
          <h5>Login</h5>
          <h4>Login to your account</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                name="email"
                className="form-control rounded-0"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="error-text">{emailError}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                name="password"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button className="btn btn-success w-100" type="submit">
              Login
            </button>
          </form>

          
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <p><Link to="/forgotpassword">Forgot your password?</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
