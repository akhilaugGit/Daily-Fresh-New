import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';  // Import useParams to access URL params

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { userId, token } = useParams();  // Get userId and token from the URL

  const validatePassword = (password) => {
    // Check if password is at least 8 characters long, contains 1 uppercase, and no spaces
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNoSpaces = !/\s/.test(password);
    const isValidLength = password.length >= 8;

    return hasUpperCase && hasNoSpaces && isValidLength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate password before sending request
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain 1 uppercase letter, and have no spaces.');
      return;
    }

    // Include userId and token in the request
    axios.post(`http://localhost:3001/resetpassword/${userId}/${token}`, { password })
      .then(result => {
        console.log("reset password:", result.data);
        if (result.data.Status === 'Success') {
          navigate('/login');  // Redirect to login on success
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="bg-image">
      <div className="container">
        <div className="left-section">
          {/* Add any content you like, or keep it empty */}
        </div>
        <div className="right-section">
          <h5>Reset Password</h5>
          <h4>Enter your new password</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                name="password"
                className="form-control rounded-0"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="error-text">{error}</p>}
            </div>
            <button className="btn btn-success w-100" type="submit">
              Update Password
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

export default ResetPassword;
