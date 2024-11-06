import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Manage.css'

const Manage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from the API when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/fetch`); // Replace with your API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Function to toggle the user's enabled/disabled status
  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}/status`, { isEnabled: updatedStatus }); // Replace with your API endpoint
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isEnabled: updatedStatus } : user
        )
      );
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  return (
    <div className="manage-container">
      <h1>Manage Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isEnabled ? 'Enabled' : 'Disabled'}</td>
              <td>
                <button
                  onClick={() => toggleUserStatus(user._id, user.isEnabled)}
                >
                  {user.isEnabled ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Manage;
