const path = require("path")
exports.studentList = (req, res) => {
    res.sendFile(path.join( __dirname + "/../../views/student/index.html"));
}