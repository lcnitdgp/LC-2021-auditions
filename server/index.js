const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const users = require("./models/users");
var passport = require('passport')
require("./passport/passportgoogle")(passport);
require("./passport/passportjwt")(passport);
var jwt = require("jsonwebtoken");

const MONGO_URL = "mongodb://localhost/auditions";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// AUTH //

app.get("/auth/logout", function (req, res) {
  req.logout();
  res.send("Logged out successfully");
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    const payload = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email
    };
    var token = jwt.sign(payload, process.env.SECRET, { expiresIn: 600000 });

    res.redirect(`${process.env.FRONTEND}?token=${token}`);
  }
);

// QUESTIONS //

app.listen(PORT, () => {
  console.log("The server is active on :", PORT);
});
