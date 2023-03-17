const express = require('express');
const router = express.Router();
const {studentList, createStudent, saveStudent} = require('./../app/controllers/student');

router.get("/students", studentList)
router.get("/students/create", createStudent)
router.post("/students/save", saveStudent)

module.exports = router;