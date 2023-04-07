const layout = 'admin/auth/index';
exports.passwordReset = (req, res) => {
    res.render('admin/auth/password_reset', {layout: layout});
}