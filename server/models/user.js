const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    otp: String, // Store OTP temporarily
    isEnabled: {
        type: Boolean,
        default: true
    },
    isDuser: {
        type: Boolean,
        default: false
    }
});

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
