const express = require('express');
const path = require("path")
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const app = express();
const routes = require('./src/routes/index');
const {homePage} = require('./src/app/controllers/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, '/src/views'));

const commonConfig = [
    express.static(path.join(__dirname, 'src/public')),
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
    res.locals.formData = '';
    next();
});

app.use('/', routes);
app.get("/", homePage)

app.use((req, res, next) => {
    res.status(404).json({
        message: "404 not found"
    });
});

module.exports = app;