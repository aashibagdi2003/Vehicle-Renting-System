const mongoose = require("mongoose");

const customer = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Contact_no: {
        type: Number,
        required: true,
        unique: true
    }
})


const Register = new mongoose.model("Customer", customer);

module.exports = Register;
