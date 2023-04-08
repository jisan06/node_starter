const express = require('express');
require('express-group-routes');
const router = express.Router();
const {signUpValidation, loginValidation} = require('../../app/validations/auth')
const {register, registerSubmit} = require('../../app/controllers/admin/auth/register');
const {login, loginSubmit, logout} = require('../../app/controllers/admin/auth/login');
const {passwordReset} = require('../../app/controllers/admin/auth/password_reset');
const {isAuthenticated ,isUnAuthenticated} = require('./../../app/middleware/authMiddlware');

router.get("/register", isUnAuthenticated, register);
router.post("/register", isUnAuthenticated, signUpValidation, registerSubmit);
router.get("/login", isUnAuthenticated,login);
router.post("/login", isUnAuthenticated, loginValidation, loginSubmit);
router.get("/password-reset", isUnAuthenticated, passwordReset);

router.get("/logout", isAuthenticated, logout);

module.exports = router;