import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Duser.css'; // Import the CSS file
import '../../Components/User/Udashboard/Unavbar/Unavbar';
import Dnavbar from './Dnavbar'; // Import the Dnavbar component
const Duser = () => {
  const navigate = useNavigate();

  return (
    <div className="duser-container">
    <Dnavbar />

      <header className="duser-header">
        <h1>Welcome, Delivery Partner!</h1>
        <p>Your dashboard to manage deliveries and more.</p>
      </header>

      <div className="duser-content">
       

        

       
        <div className="card register-service">
          <h2>Register for Delivery Service</h2>
          <p>You just need to register to access this service.</p>
          <button className="btn" onClick={() => navigate('/deliveryregister')}>Register Now</button>
        </div>
      </div>

      <footer className="duser-footer">
        <p>Thank you for being part of our delivery partner team!</p>
      </footer>
    </div>
  );
};

export default Duser;
