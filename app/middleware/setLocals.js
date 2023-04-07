module.exports = () => {
    return (req, res, next) => {
        res.locals.flash = req.flash();
        res.locals.errors = '';
        res.locals.isLoggedIn = req.session.isLoggedIn;
        res.locals.user = req.session.user;

        next();
    }
}