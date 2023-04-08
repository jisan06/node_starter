const express = require('express');
const path = require("path")
const expressLayouts = require('express-ejs-layouts');
const routes = require('./routes/index');
const config = require('./config/config');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(expressLayouts);
app.set('layout', 'admin/layout/master');

app.use(config.commonDepends);
app.use('/', routes);
app.use((req, res, next) => {
    res.status(404).json({
        message: "404 not found"
    });
});

module.exports = app;