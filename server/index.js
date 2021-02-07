const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config()
const users = require("./models/users");
const questions = require("./models/questions");
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

app.get("/api/questionslist", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if(err){
      console.log(err);
      console.log("User Not Found")
      res.json({ message: "User Not Found" });
    }
    else{
      if(user.isadmin == true){
        const qList = await questions.find();
        res.json({ qList: qList});
      }
      else{
        res.json({ message: "Unauthorized User. Access denied." });
      }
    }
  })
})

app.post("/api/questionsadd", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if(err){
      console.log(err);
      console.log("User Not Found")
      res.json({ message: "User Not Found" });
    }
    else{
      if(user.isadmin == true){
        await questions.create({
          content: req.body.content,
          fields: req.body.fields,
          options: req.body.options,
          type: req.body.type,
          image: req.body.image
        })
        console.log("Question Added Successfully")
        res.json({ message: "Question Added Successfully" });
      }
      else{
        res.json({ message: "Unauthorized User. Access denied." });
      }
    }
  })
})

app.put("/api/questionsupdate", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if(err){
      console.log(err);
      console.log("User Not Found")
      res.json({ message: "User Not Found" });
    }
    else{
      if(user.isadmin == true){
        await questions.findByIdAndUpdate(req.body.qid, { content: req.body.content }, (err, docs) => {
          if(err){
            console.log(err);
            console.log("Error in updatng")
          }
          else{
            console.log("Successfully Updated")
            res.json({ message: "Successfully Updated"})
          }
        })
      }
      else{
        res.json({ message: "Unauthorized User. Access denied." });
      }
    }
  })
})

app.delete("/api/questionsdelete", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if(err){
      console.log(err);
      console.log("User Not Found")
      res.json({ message: "User Not Found" });
    }
    else{
      if(user.isadmin == true){
        await questions.findByIdAndDelete(req.body.qid, (err, docs) => {
          if(err){
            console.log(err);
            console.log("Error in deleting")
          }
          else{
            console.log("Successfully Deleted")
            res.json({ message: "Successfully Deleted"})
          }
        })
      }
      else{
        res.json({ message: "Unauthorized User. Access denied." });
      }
    }
  })
})

app.listen(PORT, () => {
  console.log("The server is active on :", PORT);
});
