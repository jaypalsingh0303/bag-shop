const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const adminModel = require("../models/admin-model");
const { productCreate, productStore } = require("../controllers/admin/productController");
const upload = require("../config/multer-config");

route.get("/", function (req, res) {
    res.send("admin route");
});

if (process.env.NODE_ENV === "development") {
    route.get("/create", async function (req, res) {
        let admin = await adminModel.find();
        if (admin.length > 0) return res.status(400).send("Admin already exist.");

        try {
            let { fullname, email, password } = req.query;

            bcrypt.genSalt(10, function (err, salt) {
                if (err) return res.status(400).send(err);

                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) return res.status(400).send(err);

                    let createdAdmin = await adminModel.create({
                        fullname,
                        email,
                        password: hash
                    });

                    res.status(201).send(createdAdmin);
                });
            });

        } catch (err) {
            res.status(400).send(err.message);
        }
    });
}

route.get("/product/create", productCreate);

route.post("/product/store", upload.single("image"), productStore);

module.exports = route;