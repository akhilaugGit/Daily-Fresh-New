import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dnavbar from './Dnavbar';
import delvImage from '../../assets/delv.png';

const Duser = () => {
  const navigate = useNavigate();

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
    },
    header: {
      textAlign: 'center',
      marginTop: '20px',
      marginBottom: '10px',
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
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '20px',
      zIndex: 2,
    },
    card: {
      backgroundColor: '#fff',
      boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
      borderRadius: '20px',
      padding: '20px',
      width: '90%',
      maxWidth: '400px',
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
      position: 'relative',
      width: '90%',
      height: 'auto',
      overflow: 'hidden',
      zIndex: 1,
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
      backgroundColor: '#2A5CB3',
      color: '#fff',
      width: '100%',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.container}>
      <Dnavbar />

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

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Order Management</h2>
          <p style={styles.cardDescription}>Manage and track your delivery orders efficiently.</p>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate('/orderdetails')}
          >
            Manage Orders
          </button>
        </div>
      </div>

      <div style={styles.imageContainer}>
        <img src={delvImage} alt="Delivery" style={styles.image} />
      </div>

      <footer style={styles.footer}>
        <p>Thank you for being part of our delivery partner team!</p>
      </footer>
    </div>
  );
};

export default Duser;
