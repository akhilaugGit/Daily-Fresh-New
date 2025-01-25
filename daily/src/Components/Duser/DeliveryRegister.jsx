import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeliveryRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    location: '',
    drivingLicense: null,
  });

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

  return (
    <div className="delivery-register-container">
      <h1>Delivery Partner Registration</h1>
      <form onSubmit={handleSubmit} className="delivery-register-form">
        <div className="form-group">
          <label htmlFor="location">Select Location</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Select a Location --</option>
            <option value="kochi">Kochi</option>
            <option value="trivandrum">Trivandrum</option>
            <option value="kottayam">Kottayam</option>
            <option value="kozhikode">Kozhikode</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="drivingLicense">Upload Driving License</label>
          <input
            type="file"
            id="drivingLicense"
            name="drivingLicense"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

export default DeliveryRegister;
