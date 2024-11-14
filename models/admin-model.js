const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    fullname:{
        type: String,
        trim:true,
        minLength: 3
    },
    email: String,
    password: String,
    products: {
        type:Array,
        default: []
    },
    picture: String,
    gstin: String    
});

module.exports = mongoose.model("admin", adminSchema);