const mongoose = require('mongoose');
const config = require('./config');
const dbUrl = config.db.url;

mongoose.connect(dbUrl)
.then(() => console.log('DB is connected'))
.catch((error) => {
    console.log('Something wrong');
    console.log(error.message);
    process.exit(1);
})