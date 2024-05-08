const express = require('express');
const { register, login,userProfile } = require('../controllers/auth.controllers.js');
const { registerValidation, loginValidation} = require('../middleware/authvalidation.middleware.js');
const verifyToken = require("../middleware/auth.middleware.js") 
const router= express.Router();

router.post('/register',registerValidation,register);
router.post('/login',loginValidation, login);
router.get("/profile/:id", verifyToken, userProfile);

module.exports= router;