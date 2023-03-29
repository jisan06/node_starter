const express = require('express');
const path = require("path")
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const routes = require('./routes/index');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(expressLayouts);
app.set('layout', 'admin/layout/master');

const commonConfig = [
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    session({
        secret:'geeksforgeeks',
        cookie: {maxAge: 60000},
        saveUninitialized: false,
        resave: false
    }),
    flash()
]

app.use(commonConfig);
app.use(function(req, res, next){
    res.locals.flash = req.flash();
    res.locals.errors = '';
    next();
});

app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "404 not found"
    });
});

module.exports = app;