const express = require('express');
const router = express.Router();
const {homePage} = require('../app/controllers/index');
const student = require('./admin/student');
const auth = require('./admin/auth');

router.get("/", (req, res) => {
    res.send('This is home page')
})

/*
 * Admin routes
 */
router.use('/admin', auth,student)
router.get("/admin", homePage).name

module.exports = router;