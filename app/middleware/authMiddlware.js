const auth = require('./../../routes/admin/auth');
exports.isAuthenticated = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/admin/login');
    }
    next();
}
exports.isUnAuthenticated = (req, res, next) => {
    if(req.session.isLoggedIn) {
        return res.redirect('/admin');
    }
    next();
}