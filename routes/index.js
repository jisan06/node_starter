const express = require('express');
require('express-group-routes');
const router = express.Router();
const authRouter = express.Router();
const {homePage} = require('../app/controllers/index');
const student = require('./admin/student');
const auth = require('./admin/auth');
const {isAuthenticated, isUnAuthenticated} = require('./../app/middleware/authMiddlware');

router.get("/", (req, res) => {
    res.send('This is home page')
})

/*
 * Admin routes
 */
router.use('/admin', auth) //auth routes
router.use('/admin', isAuthenticated, student)

router.get("/admin", homePage).name

module.exports = router;