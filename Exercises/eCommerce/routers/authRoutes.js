const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController')
//handling auth routes

//registration
router.post('/register', authControllers.registration);
//login
router.post('/login', authControllers.login);


module.exports = router