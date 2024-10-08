const UserModel = require('../models/user'); // Assuming you have a User model
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// User Registration
const registerUser = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new UserModel({ email, password, name });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
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
            console.log('User not found:', email); // Log the email that wasn't found
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user); // Log the user details

        // Check password
        if (user.password !== password) {
            console.log('Incorrect password for user:', user.email); // Log for incorrect password
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, 'jwt_secret_key', { expiresIn: '1d' });

        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error); // Log the error for better debugging
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
                user: 'youremail@gmail.com',
                pass: 'yourpassword' // Use environment variables for security in production
            }
        });

        // Send reset email
        const mailOptions = {
            from: 'youremail@gmail.com',
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

module.exports = {
    registerUser,
    loginUser,
    forgotPassword
};
