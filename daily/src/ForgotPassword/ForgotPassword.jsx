import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';  // Import Link

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous errors
    setError('');

    // Validate email format and ensure no spaces are present
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
    } else {
      axios.post('http://localhost:3001/forgotpassword', { email })
        .then(result => {
          console.log("Response:", result.data);
          if (result.data.Status === 'success') {
            if (result.data.role === "admin") {
              navigate('/dashboard');
            } else {
              navigate('/');
            }
          }
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <div className="bg-image">
      <div className="container">
        <div className="leftp-section">
          {/* Add any content you like, or keep it empty */}
        </div>
        <div className="right-section">
          <h5>Forgot Password</h5>
          <h4>Enter your email to reset your password</h4>
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
              {error && <p className="error-text">{error}</p>}
            </div>
            <button className="btn btn-success w-100" type="submit">
              Submit
            </button>
          </form>
          <p className="text-center mt-3">
            Remember your password?{' '}
            <Link to="/login" className="btn btn-default border" type="button">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
