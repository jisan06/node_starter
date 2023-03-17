const {v4: uuidv4} = require("uuid");
const path = require("path");
const Student = require("./../models/students");

exports.studentList = (req, res) => {
    res.render('student/index');
}
exports.createStudent = (req, res) => {
    res.render('student/create');
}
exports.saveStudent = async (req, res) => {
    const student = new Student({
        id: uuidv4(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
    });
    await student.save();
    res.status(201).json({
        message: "user is created",
    })
}
exports.editStudent = (req, res) => {
    res.render('student/edit');
}
exports.updateStudent = (req, res) => {

}
exports.deleteStudent = (req, res) => {

}