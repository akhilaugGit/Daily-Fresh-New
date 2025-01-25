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
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Manage Delivery Users</h1>
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
                        width: '100px',
                        height: '100px',
                      
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDUsers;
