const express = require('express');
const path = require("path")
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const app = express();
const routes = require('./src/routes/index');
const {homePage} = require('./src/app/controllers/index');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use(expressLayouts);
app.set('layout', path.join(__dirname, '/src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);
app.get("/", homePage)

app.use((req, res, next) => {
    res.status(404).json({
        message: "404 not found"
    });
});

module.exports = app;