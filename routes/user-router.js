const express = require("express");
const route = express.Router();
const { registerView, registerUser, loginView, loginUser, logout } = require("../controllers/authController");
const isLoggedIn = require("../middlewares/isLoggedIn");

route.get("/register", registerView);
route.post("/register", registerUser);
route.get("/login", loginView);
route.post("/login", loginUser);
route.get("/logout", logout);
route.get("/shop", isLoggedIn, function (req, res) {
    res.send("ok shop");
});

module.exports = route;