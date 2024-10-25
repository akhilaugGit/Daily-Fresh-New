import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import './Signup.css';  // Import the CSS file

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');  // OTP input
  const [errors, setErrors] = useState({ username: '', email: '', password: '', otp: '' });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [otpSent, setOtpSent] = useState(false);  // To track OTP sent status
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

  // Live validation for OTP
  const handleOtpChange = (e) => {
    const otpValue = e.target.value;
    setOtp(otpValue);

    if (otpValue.length !== 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: 'OTP must be 6 digits.'
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        otp: ''
      }));
    }
  };

  // Check if all fields are valid
  const checkAllFields = (username, email, password) => {
    if (validateUsername(username) && validateEmail(email) && validatePassword(password)) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Register user and send OTP
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isButtonDisabled) {
      axios.post('http://localhost:3001/api/auth/register', { username, email, password })
        .then(result => {
          console.log(result);
          setOtpSent(true);  // Set OTP status to true after registration
        })
        .catch(error => console.log(error));
    }
  };

  // Handle OTP verification
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3001/api/auth/verify-otp', { email, otp })
      .then(response => {
        alert("OTP verified successfully!");
        navigate('/login');  // Redirect to login on success
      })
      .catch(error => {
        console.error("OTP verification failed:", error);
      });
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

            <button
              className="btn btn-success w-100"
              type="submit"
              disabled={isButtonDisabled}
            >
              Register
            </button>
          </form>

          {/* OTP form */}
          {otpSent && (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-3">
                <label htmlFor="otp">
                  <strong>Enter OTP</strong>
                </label>
                <input
                  type="text"
                  name="otp"
                  className="form-control rounded-0"
                  value={otp}
                  onChange={handleOtpChange}
                />
                {errors.otp && <p className="error-text">{errors.otp}</p>}
              </div>

              <button className="btn btn-primary w-100" type="submit">
                Verify OTP
              </button>
            </form>
          )}

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
