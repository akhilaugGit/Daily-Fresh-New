import React from 'react';
import { useNavigate } from 'react-router-dom';
import FarmImage from '../assets/farm.png';

const Fuser = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to right, #01644c, #4ac195)', // Green gradient
      color: '#fff',
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
      color: '#FFD700', // Gold color
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#ADFF2F', // Light green
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
      color: '#228B22', // Forest green
    },
    cardDescription: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '20px',
    },
    button: {
      backgroundColor: '#FFD700',
      color: '#006400',
      border: 'none',
      padding: '12px 25px',
      fontSize: '1rem',
      fontWeight: 'bold',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#FFA500',
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
      backgroundColor: '#01644c',
      color: '#fff',
      width: '100%',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome, Farmer!</h1>
        <p style={styles.subtitle}>Empowering farmers with smart solutions for better yield.</p>
      </header>

      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Daily Fresh Poultry Farmer</h2>
          <p style={styles.cardDescription}>Daily Fresh Poultry Farmer</p>
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
          <h2 style={styles.cardTitle}>Add Product</h2>
          <p style={styles.cardDescription}>Manage and add your products for sale.</p>
          <button
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
            onClick={() => navigate('/farmeraddproduct')}
          >
            Add Now
          </button>
        </div>
      </div>

      <div style={styles.imageContainer}>
        <img src={FarmImage} alt="Farm" style={styles.image} />
      </div>

      <footer style={styles.footer}>
        <p>Thank you for being part of our smart farming network!</p>
      </footer>
    </div>
  );
};

export default Fuser;
