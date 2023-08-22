const mongoose = require("mongoose");

const host = new mongoose.Schema({
    Host_name: {
        type: String,
        required: true
    },
    Host_mail: {
        type: String,
        required: true
    },
    Phone_no: {
        type: Number,
        required: true
    },
    Vehicle_type: {
        type: String,
        required: true
    },
    Vehicle_number: {
        type: String,
        required: true,
        unique: true
    }
})

const Host = new mongoose.model("Host", host);

module.exports = Host;