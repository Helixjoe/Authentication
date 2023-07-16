//jshint esversion:6
const { log } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/usersDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/login", (req, res) => {
    res.render("login");
})
app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save()
        .then(() => {
            console.log('User saved successfully');
            res.render("secrets");
        })
        .catch((err) => {
            console.error(err);
        });
});

app.post("/login", async (req, res) => {
    const userInfo = await User.findOne({ email: req.body.username });
    if (userInfo != null) {
        if (userInfo.password === req.body.password) {
            res.render("secrets");
        }
    }

})
app.listen("3000", (req, res) => {
    console.log("Serever running on 3000");
})