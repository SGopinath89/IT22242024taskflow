const express = require("express");
const userController = require("../controllers/user.controller.js");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/get-user", userController.getUser);
router.post("/get-user-with-email", userController.getUserWithMail);

module.exports = router;
