const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isEnabled: { type: Boolean, default: true }, // Add this field
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
