const express = require("express");
const route = express.Router();

route.get("/", function(req, res){
    res.send("admin route");
});

module.exports = route;