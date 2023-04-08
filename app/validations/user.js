const { body } = require('express-validator');
const User = require("../models/user");
exports.formValidation = [
    body('name').not().isEmpty().withMessage('Full name is required'),
    body('phone')
        .not()
        .isEmpty()
        .withMessage('Phone number is required')
        .bail()
        .isLength({min: 11,max: 11})
        .withMessage('Phone number should 11 digit'),
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
            const student = await User.findOne(field);
            if(student) return Promise.reject('Email already exist');
        })
];