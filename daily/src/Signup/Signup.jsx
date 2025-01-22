import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import './Signup.css';  // Import the CSS file

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDuser, setIsDuser] = useState(false); // Track Delivery Partner checkbox state
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // Email validation function with added top-level domain check
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|org|in|co\.in)$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);  // Check for at least one uppercase letter
    const hasNoSpaces = !/\s/.test(password);  // Check for no white spaces
    const isValidLength = password.length >= 8;  // Ensure at least 8 characters
    return hasUpperCase && hasNoSpaces && isValidLength;
  };

  // Username validation
  const validateUsername = (username) => {
    return username.trim().length > 0;
  };

  // Live validation for username
  const handleUsernameChange = (e) => {
    const usernameValue = e.target.value;
    setUsername(usernameValue);

    if (!validateUsername(usernameValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Name is required.'
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: ''
      }));
    }

    checkAllFields(usernameValue, email, password);
  };

  // Live validation for email
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.'
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ''
      }));
    }

    checkAllFields(username, emailValue, password);
  };

  // Live validation for password
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (!validatePassword(passwordValue)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 8 characters long, contain at least 1 uppercase letter, and have no spaces.'
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: ''
      }));
    }

    checkAllFields(username, email, passwordValue);
  };

  // Check if all fields are valid
  const checkAllFields = (username, email, password) => {
    if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Handle Delivery Partner checkbox change
  const handleDuserChange = (e) => {
    setIsDuser(e.target.checked);
  };

  // Register user and navigate to login page
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isButtonDisabled) {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, { username, email, password, isDuser })
        .then(result => {
          console.log(result);
          navigate('/login');  // Redirect to login on successful registration
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="bg-image">
      <div className="container">
        <div className="left-section"></div>
        <div className="right-section">
        
          <h5>Register</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                className="form-control rounded-0"
                name="name"
                value={username}
                onChange={handleUsernameChange}
              />
              {errors.username && <p className="error-text">{errors.username}</p>}
            </div>

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
              {errors.email && <p className="error-text">{errors.email}</p>}
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
                onChange={handlePasswordChange}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="isDuser">
                <strong>Are you a Delivery Partner?</strong>
              </label>
              <input
                type="checkbox"
                id="isDuser"
                name="isDuser"
                checked={isDuser}
                onChange={handleDuserChange}
              />
            </div>

            <button
              className="btn btn-success w-100"
              type="submit"
              disabled={isButtonDisabled}
            >
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{' '}
            <Link to="/login" className="btn btn-default border" type="button">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
