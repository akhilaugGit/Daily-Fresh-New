import React from 'react';
import './Duser.css'; // Import the CSS file
import '../../Components/User/Udashboard/Unavbar/Unavbar';
import Unavbar from '../../Components/User/Udashboard/Unavbar/Unavbar';


const Duser = () => {
  return (
    
    <div className="duser-container">
          <Unavbar/>

      <header className="duser-header">
        <h1>Welcome, Delivery Partner!</h1>
        <p>Your dashboard to manage deliveries and more.</p>
      </header>

      <div className="duser-content">
        <div className="card pending-deliveries">
          <h2>Pending Deliveries</h2>
          <p>View and manage all your pending delivery orders.</p>
          <button className="btn">View Details</button>
        </div>

        <div className="card delivery-history">
          <h2>Delivery History</h2>
          <p>Check your completed deliveries and earnings.</p>
          <button className="btn">View History</button>
        </div>

        <div className="card account-settings">
          <h2>Account Settings</h2>
          <p>Update your profile, change password, and more.</p>
          <button className="btn">Manage Account</button>
        </div>
      </div>

      <footer className="duser-footer">
        <p>Thank you for being part of our delivery partner team!</p>
      </footer>
    </div>
  );
};

export default Duser;
