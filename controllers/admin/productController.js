const productModel = require("../../models/product-model");

module.exports.productCreate = function (req, res) {
    let error = req.flash("error");
    let success = req.flash("success");

    res.render("admin/product/create", { error, success });
}

module.exports.productStore = async function (req, res) {

    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
    });

    req.flash("success", "Product created successfully.");
    return res.redirect("/admin/product/create");
}