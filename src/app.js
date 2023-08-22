const express = require("express");
const path = require("path");
const app = express();
const multer = require('multer')
const fs = require("fs");
// const upload = require('express-fileupload')
const mongoose = require("mongoose");

require("./db/conn");
const Register = require("./models/signup.js");
const Host = require("./models/host.js");
const Vehicle = require("./models/vehicle.js");
// const upload= require("../middleware/upload");
const static_path = path.join(__dirname, "../public/css");
var Storage = multer.diskStorage({
    destination: static_path + "/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: Storage }).single('file');

const port = process.env.PORT || 3000;


const template_path = path.join(__dirname, "../templates/views");

// app.use(upload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path)

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/signup", (req, res) => {
    res.render("signup")
});
app.get("/booking", (req, res) => {
    res.render("booking")
});
app.get("/home", (req, res) => {

    res.render("home")

});
app.get("/admin", (req, res) => {

    res.render("admin")

});
app.post("/signup", async (req, res) => {
    try {

        const check = req.body.check;
        if (check == "true") {
            const user = new Register({
                Name: req.body.uname,
                Email: req.body.email,
                Password: req.body.pass,
                Contact_no: req.body.phn

            });

            const registered = await user.save();
            res.status(201).render("index");
        } else {
            res.send("Please accept the conditions");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/booking", async (req, res) => {
    try {

        const agree = req.body.agree;
        if (agree == "checked") {
            const host = new Host({
                Host_name: req.body.hname,
                Host_mail: req.body.hmail,
                Phone_no: req.body.hphn,
                Vehicle_type: req.body.type,
                Vehicle_number: req.body.vnum
            });

            const registered = await host.save();
            res.status(201).render("booking");
        } else {
            res.send("Please accept the conditions");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post("/upload", upload, async (req, res) => {
    try {
        // var img = fs.readFileSync(req.file.path);
        // var encode_img = img.toString('base64');
        // var final_img = {
        // contentType:req.file.mimetype,
        // image:new Buffer(encode_img,'base64')
        // };
        // if(req.file){
        //     var fil = req.file.img
        //     var filename= fil.name

        //     fil.mv('./uploads/',filename, function (err){
        //         if(err){
        //             res.send(err.message)
        //         }

        //     })
        // }
        // else{
        //     console.log("hlhhhh")
        // }
        const agree = req.body.agree;
        if (agree == "checked") {
            const vehicle = new Vehicle({
                Vehicle_number: req.body.vnum,
                Vehicle_brand: req.body.vbrand,
                Vehicle_model: req.body.vmodel,
                Vehicle_variant: req.body.variant,
                City: req.body.city,
                Fuel_type: req.body.fuel,
                Year_of_registration: req.body.year,
                Distance_travelled: req.body.dist,
                Pincode: req.body.pin,
                Image: req.file.filename,
                Rent: req.body.rent,
                Vehicle_description: req.body.vdes
            })


            const registered = vehicle.save();
            res.status(201).render("index");
        } else {
            res.send("Please accept the conditions");
        }
    } catch (error) {
        res.status(400).send(error.message + " !!");
    }
});


app.post("/home", async (req, res) => {
    try {

        const lemail = req.body.lemail;
        const user = await Register.findOne({ Email: lemail })
        if (user) {
            const result = req.body.lpass === user.Password;
            if (result) {
                const vehicles = Vehicle.findOne({
                    Vehicle_number: "acvq"
                });
                const ab = vehicles['schema']['obj'];
                try {
                    console.log(vehicles)
                }
                catch (error) {
                    console.log(error);
                }
                res.status(201).render("home", { vehicles: ab });

            }
            else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log("Server is running at port no." + port);
});