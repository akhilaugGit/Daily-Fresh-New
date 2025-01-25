const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    otp: String, // Store OTP temporarily
    image : {type: String,
        required : false,
    },

    location : {
        type: String,
        required : false,
    },
    
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
