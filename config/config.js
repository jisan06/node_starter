require("dotenv").config();

const config = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        url: process.env.DB_URL || "mongodb://localhost:27017/students"
    }
}

module.exports = config;