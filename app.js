const express = require('express');
const path = require("path")
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const bodyParser = require('body-parser')
const routes = require('./routes/index');
const app = express();
const setLocals = require('./app/middleware/setLocals');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(expressLayouts);
app.set('layout', 'admin/layout/master');

const commonConfig = [
    express.static(path.join(__dirname, 'public')),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
    session({
        secret:'jsjisan',
        saveUninitialized: true,
        resave: false,
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 500 * 60 * 60 * 2
        })
    }),
    flash(),
    setLocals()
];
app.use(commonConfig);

app.use('/', routes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "404 not found"
    });
});

module.exports = app;