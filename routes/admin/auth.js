const express = require('express');
const router = express.Router();
const {register, registerSubmit} = require('../../app/controllers/admin/auth/register');
const {login} = require('../../app/controllers/admin/auth/login');
const {passwordReset} = require('../../app/controllers/admin/auth/password_reset');

router.get("/register", register);
router.post("/register", registerSubmit);
router.get("/login", login);
router.get("/password-reset", passwordReset);

module.exports = router;