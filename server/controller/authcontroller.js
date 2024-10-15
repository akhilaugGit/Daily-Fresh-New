const UserModel = require('../models/user'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
     

// User Registration
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create new user with hashed password
        const newUser = new UserModel({ email, password: hashedPassword, name });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);  // Log error details for debugging
        res.status(500).json({ message: 'Error registering user', error });
    }
};
// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log('User not found:', email);  // Log the email that wasn't found
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user);  // Log the user details

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Incorrect password for user:', user.email);  // Log for incorrect password
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token if login is successful
        const token = jwt.sign({ id: user._id }, 'jwt_secret_key', { expiresIn: '1d' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);  // Log the error for better debugging
        res.status(500).json({ message: 'Error logging in', error });
    }
};


// Forgot Password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const token = jwt.sign({ id: user._id }, 'jwt_secret_key', { expiresIn: '1d' });

        // Set up nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'akhilaugustine2025@mca.ajce.in',
                pass: 'xbqzjtphrndrqkdu' // Use environment variables for security in production
            }
        });

        // Send reset email
        const mailOptions = {
            from: 'akhilaugustine2025@mca.ajce.in',
            to: email,
            subject: 'Reset Password',
            text: `Click here to reset your password: http://localhost:5173/resetpassword/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error sending email', error });
            } else {
                res.json({ message: 'Reset password email sent', info });
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error processing request', error });
    }
};


const resetPassword = async (req, res) => {
    const { userId, token } = req.params;  // Use req.params for userId and token
    const { password } = req.body;

    console.log('Received userId:', userId);  // Debugging: log userId
    console.log('Received token:', token);    // Debugging: log token
    console.log('Received new password:', password);  // Debugging: log password

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'jwt_secret_key');
        console.log('Decoded token:', decoded);  // Debugging: log decoded token

        // Ensure the userId matches the token's id
        if (decoded.id !== userId) {
            console.log('Token userId does not match provided userId');
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Find the user by userId
        const user = await UserModel.findById(userId);
        if (!user) {
            console.log('User not found');  // Debugging: log if user not found
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user);  // Debugging: log user details

        // Hash the new password and update
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password:', hashedPassword);  // Debugging: log hashed password

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);  // Debugging: log error details
        res.status(500).json({ message: 'Error resetting password', error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
};
