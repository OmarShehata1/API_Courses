const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/users.controllers");
const verifyToken = require("../middleware/verifyToken");

//get all users

//register

//login

router.route("/").get(verifyToken, userControllers.getAllUsers);

router.route("/register").post(userControllers.register);

router.route("/login").post(userControllers.login);

module.exports = router;
