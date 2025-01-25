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
            Authorization: `Bearer ${localStorage.getItem('token')}` // Replace 'token' if you use a different key
          }
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
    <div className="manage-container">
      <button onClick={handledashboard}>
        ⬅️ Back
      </button>
      <h1>Manage Delivery Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {dUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.location || 'N/A'}</td>
              <td>
                {user.image ? (
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${user.image}`}
                    alt="User"
                    className="user-image"
                  />
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
