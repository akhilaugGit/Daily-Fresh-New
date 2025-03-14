import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ManageDUsers = () => {
  const [dUsers, setDUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of delivery users from the API
    const fetchDUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/dusers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setDUsers(response.data.dusers);
      } catch (error) {
        console.error('Error fetching delivery users:', error);
      }
    };
    fetchDUsers();
  }, []);

  // Function to toggle delivery user's enabled/disabled status
  const toggleDUserStatus = async (userId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}/status`, { isEnabled: updatedStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDUsers((prevDUsers) =>
        prevDUsers.map((user) =>
          user._id === userId ? { ...user, isEnabled: updatedStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating delivery user status:', error);
    }
  };

  // Function to toggle delivery user's order management visibility
  const toggleOrderManagement = async (userId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}/visibility`, { isDovisible: updatedStatus }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDUsers((prevDUsers) =>
        prevDUsers.map((user) =>
          user._id === userId ? { ...user, isDovisible: updatedStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating order management visibility:', error);
    }
  };

  const handledashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={handledashboard}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        ⬅️ Back
      </button>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Manage  Delivery-boy/Framer </h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '20px 0',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'left' }}>Location</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Image</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Action</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Order Management</th>
            <th style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>Order Action</th>
          </tr>
        </thead>
        <tbody>
          {dUsers.map((user) => (
            <tr key={user._id}>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.username}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px' }}>{user.location || 'N/A'}</td>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                {user.image ? (
                  <a
                    href={user.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#007BFF' }}
                  >
                    <img
                      src={user.image}
                      alt="User"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </a>
                ) : (
                  'No Image'
                )}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                {user.isEnabled ? 'Enabled' : 'Disabled'}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => toggleDUserStatus(user._id, user.isEnabled)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: user.isEnabled ? '#FF6347' : '#32CD32',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {user.isEnabled ? 'Disable' : 'Enable'}
                </button>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                {user.isDovisible ? 'Visible' : 'Hidden'}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => toggleOrderManagement(user._id, user.isDovisible)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: user.isDovisible ? '#FF6347' : '#32CD32',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {user.isDovisible ? 'Hide Orders' : 'Show Orders'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDUsers;