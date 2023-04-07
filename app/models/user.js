const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "First name is required"],
        max: 255,
        trim: true
    },
    phone: {
        type: Number,
        maxLength: 11,
        unique: true
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        max: 255,
        unique: true
        },
    password: {
        type: String,
        required: [true, "The password is required"],
        max: 255
        },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("User", userSchema);