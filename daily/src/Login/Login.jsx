import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';  // Import the CSS file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To handle errors
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/api/auth/login', { email, password })
      .then(result => {
        console.log(result);

        // Check if login is successful
        if (result.data.message === 'Login successful') {
          // Store the JWT token in localStorage (or sessionStorage)
          localStorage.setItem('token', result.data.token);

          // Navigate to the dashboard
          navigate('/dashboard');
        } else {
          // Handle login failure, e.g., incorrect password
          setErrorMessage(result.data.message); // Display the error message
        }
      })
      .catch(error => {
        console.log(error);
        setErrorMessage('Error logging in'); // Display error if API call fails
      });
  }

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
                onChange={(e) => setEmail(e.target.value)}
              />
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
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
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
