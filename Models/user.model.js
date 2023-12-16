const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/roleUsers');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:[3,"please enter your first name"],
        maxLength:6,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [ validator.isEmail, "this field must be a valid email address"],
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type:String,
    },
    role: {
        type: String,
        enum: [userRoles.USER, userRoles.ADMIN, userRoles.MANAGER],
        default:userRoles.USER
    },
    avatar: {
        type: String,
        default:'uploads/profile.jpg'
    }
});

module.exports = mongoose.model("User", userSchema);