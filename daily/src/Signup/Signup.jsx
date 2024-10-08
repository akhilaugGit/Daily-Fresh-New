import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";
import './Signup.css';  // Import the CSS file

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);  // Check for at least one uppercase letter
    const hasNoSpaces = !/\s/.test(password);  // Check for no white spaces
    const isValidLength = password.length >= 8;  // Ensure at least 8 characters

    return hasUpperCase && hasNoSpaces && isValidLength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let emailError = '';
    let passwordError = '';

    // Email validation
    if (!validateEmail(email)) {
      emailError = 'Please enter a valid email address.';
    }

    // Password validation
    if (!validatePassword(password)) {
      passwordError = 'Password must be at least 8 characters long, contain at least 1 uppercase letter, and have no spaces.';
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
    } else {
      // If validation passes, proceed to submit
      axios.post('http://localhost:3001/api/auth/register', { username, email, password })
        .then(result => {
          console.log(result);
          navigate('/login');
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
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                name="email"
                className="form-control rounded-0"
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
            </div>
            <button className="btn btn-success w-100" type="submit">
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
