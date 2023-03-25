const express = require('express');
require('express-group-routes');
const router = express.Router();
const {formValidation} = require('./../app/validations/student')
const {
        studentList, createStudent, saveStudent, editStudent, updateStudent
    } = require('./../app/controllers/student');

router.group("/students", (router) => {
    router.get("/", studentList)
    router.get("/create", createStudent)
    router.post("/create", formValidation, saveStudent)
    router.get("/edit/:id", editStudent)
    router.post("/edit/:id", formValidation, updateStudent)
});

module.exports = router;