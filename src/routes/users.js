// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const {register, processRegister, login, processLogin, logout} = require('../controllers/usersController');
const loginUserValidator = require('../validations/loginUserValidator');
const registerUserValidator = require('../validations/registerUserValidator');

router
    .get('/register',register)
    .post('/register',registerUserValidator ,processRegister)
    .get('/login',login)
    .post('/login', loginUserValidator,processLogin)
    .get('/logout',logout)

module.exports = router;
