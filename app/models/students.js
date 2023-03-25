const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        max: 255,
        trim: true
    },
    last_name: {
        type: String,
        required: [true, "Last name is required"],
        max: 255,
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"],
        maxLength: 11,
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        max: 255,
        unique: true
        },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Student", studentSchema);