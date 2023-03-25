const { body } = require('express-validator');
const Student = require("./../models/students");
exports.formValidation = [
    body('first_name').not().isEmpty().withMessage('First name is required'),
    body('last_name').not().isEmpty().withMessage('Last name is required'),
    body('phone').not().isEmpty().withMessage('Phone number is required'),
    body('email')
        .not().isEmpty().withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage("Email not valid")
        .custom(async (email, {req}) => {
            const field = {
                email: email
            }
            if(req.params && req.params.id) {
                field._id = {$ne: req.params.id};
            }
            const student = await Student.findOne(field);
            if(student) return Promise.reject('Email already exist');
        })
];