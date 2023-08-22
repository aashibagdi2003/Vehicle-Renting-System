const mongoose = require("mongoose");

const vehicle = new mongoose.Schema({
    Vehicle_number: {
        type: String,
        required: true,
        unique: true
    },
    Vehicle_brand: {
        type: String,
        required: true
    },
    Vehicle_model: {
        type: String,
        required: true
    },
    Vehicle_variant: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Fuel_type: {
        type: String,
        required: true
    },
    Year_of_registration: {
        type: Number,
        required: true
    },
    Distance_travelled: {
        type: Number,
        required: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    Rent: {
        type: Number,
        required: true
    },
    Image: {
        type: String
        // required:true
    },
    Vehicle_description: {
        type: String,
        required: true
    }
})

const Vehicle = new mongoose.model("Vehicle", vehicle);

module.exports = Vehicle;