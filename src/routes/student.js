const express = require('express');
const router = express.Router();
const {studentList} = require('./../app/controllers/student');

router.get("/students", studentList)
router.get("/students/create", (req, res) => {
    res.send("It's a student list create route")
})

module.exports = router;