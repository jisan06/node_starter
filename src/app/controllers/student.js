const {v4: uuidv4} = require("uuid");
const { body, validationResult } = require('express-validator');
const errorFormatter = require('../helper/errorValidationFormatter')
const Student = require("./../models/students");

const view = (fileName) => {
    return 'student/' + fileName;
}

exports.studentList = (req, res) => {
    Student.find()
        .then(students => {
            res.render(view('index'), {students});
        })
        .catch((error) => {
            console.log(error)
            res.json({
                'message': 'Error occurred'
            })
        })
}
exports.createStudent = (req, res) => {
    res.render(view('create'), {student : {}});
}
exports.saveStudent = async (req, res) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const data = {
                errors : errors.mapped(),
                student : req.body,
            }
            return res.render(view('create'), data);
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
exports.editStudent = async (req, res) => {
    const id = req.params.id;
    const student = await Student.findOne({_id: id});
    res.render(view('edit'), {student : student});
}
exports.updateStudent = async (req, res) => {
    const id = req.params.id;
    const student = await Student.findOne({_id: id});
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const data = {
                errors : errors.mapped(),
                student : req.body,
            }
            return res.render(view('edit'), data);
        }
        await student.updateOne({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
        });
        req.flash('success', 'Student is updated')
        res.redirect('/students')

    }catch (error) {
        req.flash('error', error.message);
        res.redirect('back');
    }
}
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findOneAndRemove({_id: req.params.id})
        req.flash('success', 'Student is deleted')
        res.redirect('/students')
    }catch (e) {
        req.flash('error', error.message);
        res.redirect('back');
    }
}