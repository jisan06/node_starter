const layout = 'admin/auth/index';
exports.login = (req, res) => {
    res.render('admin/auth/login', {layout: layout});
}