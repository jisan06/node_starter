const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
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
        validate:
            [
                {
                    validator: async function (email) {
                        const student = await this.constructor.findOne({ email });
                        if(student) return false;
                    },
                    message: (props) => `${props.value} is already exist!`
                },
                {
                    validator: async function (email) {
                        if(email.length > 100) return false;
                    },
                    message: (props) => `${props.value} is too long`
                },
            ]
        },
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Student", studentSchema);