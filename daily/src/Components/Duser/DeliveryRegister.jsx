import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import backgroundImg from '../../assets/delv.png';

const DeliveryRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    drivingLicense: null,
  });
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, drivingLicense: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.drivingLicense) {
      alert('Please upload your driving license.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('location', formData.location);
    formDataToSend.append('drivingLicense', formData.drivingLicense);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/duser/registerduser`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Response:', response.data);
      alert('Registration Successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message);
      alert('Failed to register. Please try again.');
    }
  };
  

const handleBack = () => {
  navigate('/duser');
};

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    formContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    header: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#7733ff',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    label: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '5px',
      display: 'block',
    },
    select: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px 20px',
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#7733ff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
  };

  return (
    <div style={styles.container}>
     <button
        onClick={handleBack}
        style={{
          alignSelf: 'flex-start',
          marginBottom: '20px',
          backgroundColor: '#6a0d',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        ⬅️ Back
      </button>
      <div style={styles.formContainer}>
        <h1 style={styles.header}> Registration</h1>
        <form onSubmit={handleSubmit}>
       
          <div style={styles.formGroup}>
            <label htmlFor="location" style={styles.label}>Select Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              style={styles.select}
              required
            >
              <option value="">-- Select a Location --</option>
              <option value="kochi">Kochi</option>
              <option value="trivandrum">Trivandrum</option>
              <option value="kottayam">Kottayam</option>
              <option value="kozhikode">Kozhikode</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="drivingLicense" style={styles.label}>Upload  License</label>
            <input
              type="file"
              id="drivingLicense"
              name="drivingLicense"
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryRegister;
