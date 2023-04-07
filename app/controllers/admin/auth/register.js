const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const errorFormatter = require('../../../helper/errorValidationFormatter')
const User = require("../../../models/user");
const layout = 'admin/auth/index';

const view = (fileName) => {
    return 'admin/auth/' + fileName;
}

exports.register = (req, res) => {
    const data = {
        user : '',
        layout : layout,
    }
    res.render(view('register'), data);
}
exports.registerSubmit = async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        const data = {
            errors : errors.mapped(),
            user : req.body,
            layout : layout,
        }
        return res.render(view('register'), data);
    }
    try {
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