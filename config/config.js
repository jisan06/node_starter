require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const path = require("path")
const setLocals = require('./../app/middleware/setLocals');
const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        url: process.env.DB_URL || "mongodb://localhost:27017/students"
    },
    commonDepends: [
        express.static(path.join(__dirname, '../public')),
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
    ]
}

module.exports = config;