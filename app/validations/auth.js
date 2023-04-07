const { body } = require('express-validator');
const User = require("../models/user");
exports.signUpValidation = [
    body('name').not().isEmpty().withMessage('Full name is required'),
    body('email')
        .not().isEmpty().withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage("Email not valid")
        .custom(async (email, {req}) => {
            const user = await User.findOne({email});
            if(user) return Promise.reject('Email already exist');
        }),
    body('password')
        .isLength({min:8, max:16})
        .withMessage('Password must be between 8 to 16 characters')
        .custom(async (password, {req}) => {
            const confirm_password = req.body.confirm_password
            if(password !== confirm_password){
                return Promise.reject('Password and Confirm Password not matched');
            }
        }),
    body('confirm_password')
        .not().isEmpty().withMessage('Email is required')
        .bail()
        .isLength({min:8, max:16})
        .withMessage('Confirm password must be between 8 to 16 characters')
        .custom(async (confirm_password, {req}) => {
            const password = req.body.password
            if(password !== confirm_password){
                return Promise.reject('Password and Confirm Password not matched');
            }
        }),
    ];

exports.loginValidation = [
    body('email')
        .not().isEmpty().withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage("Email not valid"),
    body('password')
        .not().isEmpty().withMessage('Password is required')
    ];