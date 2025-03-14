import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dnavbar from './Dnavbar';
import delvImage from '../../assets/delv.png';
import axios from 'axios';

const Duser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    isDovisible: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details from the API when the component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found, redirecting to login');
          navigate('/login');
          return;
        }
        
        console.log('Fetching user data...');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('User data received:', response.data);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  // For debugging purposes
  useEffect(() => {
    if (!loading) {
      console.log('Current userData state:', userData);
      console.log('isDovisible value:', userData.isDovisible);
    }
  }, [userData, loading]);

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#2A5CB3',
      color: '#333',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: '0',
      margin: '0',
      width: '100%',
      boxSizing: 'border-box',
    },
    header: {
      textAlign: 'center',
      marginTop: '40px',
      marginBottom: '20px',
      width: '100%',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#f2f2f2',
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#4CAF50',
    },
    content: {
      width: '100%',
      maxWidth: '1200px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      padding: '0 20px',
      boxSizing: 'border-box',
      flexWrap: 'wrap',
      marginTop: '20px',
      marginBottom: '40px',
    },
    card: {
      backgroundColor: '#fff',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
      borderRadius: '20px',
      padding: '20px',
      width: '100%',
      maxWidth: '350px',
      textAlign: 'center',
    },
    cardTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#6A0DAD',
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      padding: '12px 25px',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    imageContainer: {
      width: '100%',
      maxWidth: '800px',
      padding: '0 20px',
      boxSizing: 'border-box',
      marginTop: '20px',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '15px',
    },
    footer: {
      marginTop: 'auto',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#1a4a8d',
      color: '#fff',
      width: '100%',
      fontSize: '0.9rem',
      boxSizing: 'border-box',
    },
    loadingText: {
      color: '#fff',
      fontSize: '1.2rem',
      textAlign: 'center',
      marginTop: '50px',
    },
    errorText: {
      color: '#ff6b6b',
      fontSize: '1.2rem',
      textAlign: 'center',
      marginTop: '50px',
      padding: '20px',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: '10px',
    },
    statusIndicator: {
      position: 'absolute',
      top: '70px',
      right: '10px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '5px',
      fontSize: '0.8rem',
      zIndex: 1000,
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <Dnavbar />
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <Dnavbar />
        <div style={styles.errorText}>
          <p>{error}</p>
          <button 
            style={styles.button}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Dnavbar />
      
      {/* Status indicator (remove in production) */}
      <div style={styles.statusIndicator}>
        isDovisible: {userData.isDovisible ? 'true' : 'false'}
      </div>

      <header style={styles.header}>
        <h1 style={styles.title}>Welcome, Delivery Partner!🛵</h1>
        <p style={styles.subtitle}>Your dashboard to manage deliveries and more.</p>
      </header>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Register for Delivery Service</h2>
          <p style={styles.cardDescription}>You just need to register to access this service.</p>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate('/deliveryregister')}
          >
            Register Now
          </button>
        </div>

        {userData.isDovisible && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Order Management</h2>
            <p style={styles.cardDescription}>Manage and track your delivery orders efficiently.</p>
            <button
            id ="manageb"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
              onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
              onClick={() => navigate('/orderdetails')}
            >
              Manage Orders
            </button>
          </div>
        )}
      </div>

      

      <footer style={styles.footer}>
        <p>Thank you for being part of our delivery partner team!</p>
      </footer>
    </div>
  );
};

export default Duser;