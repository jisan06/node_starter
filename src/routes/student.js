const express = require('express');
const router = express.Router();
const {studentSaveValidator} = require('./../app/validations/student')
const {studentList, createStudent, saveStudent} = require('./../app/controllers/student');

router.get("/students", studentList)
router.get("/students/create", createStudent)
router.post("/students/create", studentSaveValidator, saveStudent)

module.exports = router;