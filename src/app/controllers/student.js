const {v4: uuidv4} = require("uuid");
const { body, validationResult } = require('express-validator');
const path = require("path");
const errorFormatter = require('../helper/errorValidationFormatter')
const Student = require("./../models/students");

const viewPath = (fileName) => {
    return 'student/' + fileName;
}

exports.studentList = (req, res) => {
    Student.find()
        .then(students => {
            res.render(viewPath('index'), {students});
        })
        .catch((error) => {
            console.log(error)
            res.json({
                'message': 'Error occurred'
            })
        })
}
exports.createStudent = (req, res) => {
    res.render(viewPath('create'));
}
exports.saveStudent = async (req, res) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const data = {
                errors : errors.mapped(),
                formData : req.body,
            }
            return res.render(viewPath('create'), data);
        }
        const student = new Student({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
        });
        await student.save();
        req.flash('success', 'Student is created')
        res.redirect('/students')

    }catch (error) {
        req.flash('error', error.message);
        res.redirect('back');
    }

}
exports.editStudent = (req, res) => {
    res.render('student/edit');
}
exports.updateStudent = (req, res) => {

}
exports.deleteStudent = (req, res) => {

}