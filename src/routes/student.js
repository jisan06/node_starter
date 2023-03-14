const express = require('express');
const router = express.Router();

router.get("/students", (req, res) => {
    res.send("It's a student list route")
})
router.get("/students/create", (req, res) => {
    res.send("It's a student list create route")
})

module.exports = router;