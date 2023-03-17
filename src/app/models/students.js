const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    first_name: {
        type: String,
        require: true,
        max: 255,
    },
    last_name: {
        type: String,
        require: true,
        max: 255,
    },
    phone: {
        type: Number,
        require: true,
        maxLength: 11,
    },
    email: {
        type: String,
        require: true,
        max: 255,
    },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Student", studentSchema);