const { validationResult } = require('express-validator');
const errorFormatter = require('../../helper/errorValidationFormatter')
const User = require("../../models/user");

const view = (fileName) => {
    return 'admin/user/' + fileName;
}

exports.userList = (req, res) => {
    User.find()
        .then(users => {
            res.render(view('index'), {users});
        })
        .catch((error) => {
            console.log(error)
            res.json({
                'message': 'Error occurred'
            })
        })
}
exports.createUser = (req, res) => {
    res.render(view('create'), {user : {}});
}
exports.saveUser = async (req, res) => {
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const data = {
                errors : errors.mapped(),
                user : req.body,
            }
            return res.render(view('create'), data);
        }
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
        });
        await user.save();
        req.flash('success', 'User is created')
        res.redirect('/admin/users')

    }catch (error) {
        req.flash('error', error.message);
        res.redirect('back');
    }

}
exports.editUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({_id: id});
    res.render(view('edit'), {user : user});
}
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({_id: id});
    try {
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            const data = {
                errors : errors.mapped(),
                user : req.body,
            }
            return res.render(view('edit'), data);
        }
        await user.updateOne({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            email: req.body.email,
        });
        req.flash('success', 'User is updated')
        res.redirect('/admin/users')

    }catch (error) {
        req.flash('error', error.message);
        res.redirect('back');
    }
}
exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndRemove({_id: req.params.id})
        req.flash('success', 'User is deleted')
        res.redirect('/admin/users')
    }catch (e) {
        req.flash('error', error.message);
        res.redirect('back');
    }
}