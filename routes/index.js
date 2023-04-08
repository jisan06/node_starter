const express = require('express');
require('express-group-routes');
const router = express.Router();
const authRouter = express.Router();
const {homePage} = require('../app/controllers/index');
const auth = require('./admin/auth');
const student = require('./admin/student');
const user = require('./admin/user');
const {isAuthenticated} = require('./../app/middleware/authMiddlware');

router.get("/", (req, res) => {
    res.send('This is home page')
})

/*
 * Admin routes
 */
router.use('/admin', auth) //auth routes
router.use('/admin', isAuthenticated, student, user)

router.get("/admin", homePage).name

module.exports = router;