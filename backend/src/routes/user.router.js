const express = require("express");
const userController = require("../controllers/user.controller.js");
const router = express.Router();
const {verifyToken}= require('../middleware/auth.middleware.js')
const validation= require('../middleware/authvalidation.middleware.js')

router.post("/register", validation.registerValidation,userController.register);
router.post("/login", userController.login);
router.get("/get-user/:id",verifyToken, userController.getUserById);
router.get("/get-user",verifyToken, userController.getUser);
router.post("/get-user-with-email",verifyToken, userController.getUserwithMail);

module.exports = router;
