const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const errorFormatter = require('../../../helper/errorValidationFormatter')
const User = require("../../../models/user");
const layout = 'admin/auth/index';

exports.register = (req, res) => {
    res.render('admin/auth/register', {layout: layout});
}
exports.registerSubmit = async (req, res) => {
    try {
        // const errors = validationResult(req).formatWith(errorFormatter);
        // if (!errors.isEmpty()) {
        //     const data = {
        //         errors : errors.mapped(),
        //         user : req.body,
        //     }
        //     return res.render(view('create'), data);
        // }
        const { name, email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        req.flash('success', 'Your registration complete, You can login now')
        res.redirect('/admin/login')

    }catch (error) {
        req.flash('error', error.message);
        res.redirect('back');
    }
}