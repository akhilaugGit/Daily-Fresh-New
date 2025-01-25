const Duser = require('../models/user');
const mongoose = require('mongoose');

const registerDuser = async (req, res) => {
  try {
    const { location } = req.body;
    const userId = req.identifier; // Get userId from verified token

    if (!req.file) {
      return res.status(400).json({ message: 'Driving License is required.' });
    }

    // Find and update the existing user instead of creating a new one
    const updatedUser = await Duser.findByIdAndUpdate(
      userId,
      {
        location,
        image: req.file.path,
        isDuser: true
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'Delivery Partner updated successfully!', 
      duser: updatedUser 
    });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

module.exports = {
  registerDuser,
};
