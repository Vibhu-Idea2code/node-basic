const express = require("express");
const routes = express.Router();
const { authController } = require("../../controllers/auth.controller");
const { auth } = require("../middleware/auth");

routes.post("/register", authController.register);
routes.post("/login", userController.login);
routes.get("/allusers", userController.getAllUser);

module.exports = routes;