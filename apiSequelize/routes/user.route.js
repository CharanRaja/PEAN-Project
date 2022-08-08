const users = require("../controllers/user.controller");
const router = require("express").Router();
const VerifyToken = require('../config/verifyToken');
const validate = require('express-validation');
const userValidation = require('../validation/user.validation');


module.exports.secret = {
    'secret': 'peanproject'
};

module.exports = app => {
    // Create a new Users
    router.post('/', validate(userValidation.createUser), users.create);

    // Login a Users
    router.post('/login', users.login);

    // Retrieve all Users
    router.get("/getUserList", VerifyToken, users.findAll);

    // Retrieve a Check Users with emailId
    router.post("/checkEmailExists", users.checkEmailId);

    app.use("/api/users", router);
};