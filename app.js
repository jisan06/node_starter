const express = require('express');
const app = express();
const routes = require('./src/routes/index');

app.use('/', routes);
app.get("/", (req, res) => {
    res.send("It's a home route")
})

module.exports = app;