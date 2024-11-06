const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
.connect(`${config.get("MONGOOS_URI")}/bag-shop`)
.then(function () {
    dbgr("connected");
})
.catch(function(err){
    dbgr(err);
});

module.exports = mongoose.connection;