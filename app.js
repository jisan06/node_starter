const express = require('express');
const app = express();
const path = require("path")
const routes = require('./src/routes/index');
const {homePage} = require('./src/app/controllers/index');

app.use(express.static(path.join(__dirname, 'src/public')));
app.use('/', routes);
app.get("/", homePage)

app.use((req, res, next) => {
    res.status(404).json({
        message: "404 not found"
    });
});

module.exports = app;