const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const errorFormatter = require('../../../helper/errorValidationFormatter')
const User = require("../../../models/user");
const layout = 'admin/auth/index';

const view = (fileName) => {
    return 'admin/auth/' + fileName;
}

exports.login = (req, res) => {
    const data = {
        user : '',
        layout : layout,
    }
    res.render(view('login'), data);
}
exports.loginSubmit = async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    const data = {
        user : req.body,
        layout : layout,
    }
    if (!errors.isEmpty()) {
        data.errors = errors.mapped()
        return res.render(view('login'), data);
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            data.errors = {email: 'Email or Password not match'};
            return res.render(view('login'), data);
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/admin')

    }catch (error) {
        req.flash('error', error.message);
        res.redirect('back');
    }
}