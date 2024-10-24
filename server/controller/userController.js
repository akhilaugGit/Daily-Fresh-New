const express = require('express');
const UserModel = require('../models/user'); // Adjust the path if necessary

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Function to enable/disable a user
const toggleUserStatus = async (req, res) => {
  const { id } = req.params;
  const { isEnabled } = req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user status
    user.isEnabled = isEnabled;
    await user.save();

    res.status(200).json({ message: 'User status updated successfully', user });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ error: 'Error updating user status' });
  }
};

// Define routes

module.exports = {
  getAllUsers,
  toggleUserStatus


}
