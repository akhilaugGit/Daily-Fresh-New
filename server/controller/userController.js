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
// Function to get the logged-in user's profile
const 

getUserProfile = async (req, res) => {
  try {
    const userId = req.identifier;
    console.log(req.identifier);
    // return res.status(200).json({ mes: userId });
    // console.log("params "+req.params);
    // const { id } = req.params;
    // console.log("Id of user" + id);
    // console.log("Default id "+req.);
    // Assuming user ID is stored in req.user (based on your auth middleware)
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Error fetching user profile' });
  }
};

// Fetch delivery users
const fetchDUsers = async (req, res) => {
  try {
    const dUsers = await UserModel.find({ isDuser: true }).select('username email location image');
    res.status(200).json({ dusers: dUsers });
  } catch (error) {
    console.error('Error fetching delivery users:', error);
    res.status(500).json({ message: 'Failed to fetch delivery users.' });
  }
};

// Define routes

module.exports = {
  getAllUsers,
  toggleUserStatus,
  getUserProfile,
  fetchDUsers


}
