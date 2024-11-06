import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { firebaseApp } from '../Home/firebaseConfig'; // Import Firebase config
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'; // Firebase methods for popup-based authentication
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import './Login.css';

// Initialize Firebase Auth and Google Provider
const auth = getAuth(firebaseApp); // This should be correctly initialized with firebaseApp
const googleProvider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle email change
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmail(emailValue)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  // Handle form submit for regular login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { email, password });
        
        if (result.data.message === 'Login successful') {
          localStorage.setItem('token', result.data.token);
          
          // Show success toast
          toast.success(result.data.message);

          if (email === 'akhilaugustine2025@mca.ajce.in') {
            navigate('/dashboard');
          } else {
            navigate('/udashboard');
          }
        } else {
          // Show error toast if login fails
          toast.error(result.data.message);
        }
      } catch (error) {
        const backendMessage = error.response?.data?.message || 'Error logging in';
        setErrorMessage(backendMessage);
        // Show error toast in case of error
        toast.error(backendMessage);
      }
    } else {
      setErrorMessage('Please fix the errors before submitting.');
      toast.error('Please fix the errors before submitting.');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken; // Access token (if needed)
        const user = result.user;

        // Construct the data to send to backend
        const fields = {
          name: user.displayName,  // Corrected to use user.displayName
          email: user.email,       // Use user.email directly
          password: null,          // No password for Google users
          images: user.photoURL,   // Use user.photoURL directly
        };

        // Send user data to backend
        axios.post('${import.meta.env.VITE_BACKEND_URL}/api/auth/glogin', fields)
          .then(result => {
            if (result.data.msg === 'User Login Successfully!') {
              // Show success toast
              toast.success(result.data.msg);

              // Redirect based on your logic
              if (fields.email === 'akhilaugustine2025@mca.ajce.in') {
                navigate('/dashboard');
              } else {
                navigate('/udashboard');
              }
            }
          })
          .catch((error) => {
            console.error('Backend error during Google login:', error);
            setErrorMessage('Login failed. Please try again.');
            toast.error('Login failed. Please try again.');
          });
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
        setErrorMessage('Google sign-in failed. Please try again.');
        toast.error('Google sign-in failed. Please try again.');
      });
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
                id="emailid"
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
                id="passwords"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button id="login" className="btn btn-success w-100" type="submit">
              Login
            </button>
          </form>

          <button className="btn btn-primary w-100 mt-3" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>

          <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          <p><Link to="/forgotpassword">Forgot your password?</Link></p>

          {/* Add ToastContainer to display the notifications */}
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Login;
