const express = require("express");
const userController = require("../controllers/user.controller.js");
const router = express.Router();
const {verifyToken}= require('../middleware/auth.middleware.js')

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/get-user/:id",verifyToken, userController.getUser);
router.post("/get-user-with-email",verifyToken, userController.getUserwithMail);

module.exports = router;
