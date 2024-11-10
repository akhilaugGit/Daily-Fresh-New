import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Uprofile.css'; // Add CSS styling as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Uprofile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch user details from the API when the component mounts
    const fetchUserProfile = async (userId) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, unable to fetch cart');
          return;
        }
        // const response = await axios.get(``); // Replace with your actual endpoint
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the request
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleUdashboard = () => {
    navigate('/udashboard');  // Pass totalPrice to Buy component
  };
  return (
    <div className="profile-container">
    
 <button onClick={handleUdashboard}>
    ⬅️Back
      </button>
      <div className="profile-details">
      <h2>Hello  {user.username}</h2>
        <p><strong>Name:</strong> {user.username}</p>
        <p><strong>📩Email id:</strong> {user.email}</p>
        {/* Only show last four characters of the password for security */}
      </div>
    </div>
  );
};

export default Uprofile;
