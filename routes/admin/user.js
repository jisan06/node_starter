const express = require('express');
require('express-group-routes');
const router = express.Router();
const {formValidation} = require('../../app/validations/user')
const {
        userList, createUser, saveUser, editUser, updateUser, deleteUser
    } = require('../../app/controllers/admin/user');

router.group("/users", (router) => {
    router.get("/", userList)
    router.get("/create", createUser)
    router.post("/create", formValidation, saveUser)
    router.get("/edit/:id", editUser)
    router.post("/edit/:id", formValidation, updateUser)
    router.get("/delete/:id", deleteUser)
});

module.exports = router;