const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

module.exports.registerView = function (req, res) {
    let error = req.flash("error");
    res.render("auth/register", { error });
}

module.exports.registerUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            req.flash("error", "User already exist.");
            return res.redirect("/users/register");
        }

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("/users/register");
            }

            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    req.flash("error", err.message);
                    return res.redirect("/users/register");
                }

                let createdUser = await userModel.create({
                    fullname,
                    email,
                    password: hash
                });

                let token = generateToken(createdUser);
                res.cookie("token", token);

                req.flash("success", "Register successfully.");
                return res.redirect("/users/shop");
            });
        });

    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/users/register");
    }
}

module.exports.loginView = function (req, res) {
    let error = req.flash("error");
    res.render("auth/login", { error: error });
}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;


    let user = await userModel.findOne({ email });
    if (!user) {
        req.flash("error", "Email or password incorrect!");
        return res.redirect("/users/login");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/users/login");
        }

        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);

            req.flash("success", "Login successfully.");
            return res.redirect("/users/shop");
        }

        req.flash("error", "Email or password incorrect!");
        return res.redirect("/users/login");
    });
}

module.exports.logout = function (req, res) {
    res.cookie("token", "");

    req.flash("error", "Logout successfully.");
    return res.redirect("/users/login");

}