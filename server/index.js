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
const cookieSession = require('cookie-session');

const MONGO_URL = "mongodb://localhost/auditions";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());
app.use(express.json());
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //token expires after 30 days
    keys: ["aditya"],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize())
app.use(passport.session());

app.get("/", (req, res) => {
  console.log("Hello", req.user)
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
    console.log(req.user)
    res.json(req.user)
  }
);

// CHECK AUTHENTICATED //

app.get("/api/current", checkauthentication, (req, res) => {
  console.log(req.user)
  res.send(true)
})

function checkauthentication(req, res, next){
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
    res.send(false)
  }
}

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
            console.log("Error in updating")
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

// ADD RESPONSES //

app.post("/api/response", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if(err){
      console.log(err);
      console.log("User Not Found")
      res.json({ message: "User Not Found" });
    }
    else{
      if(user.responses.length === 0){
        await users.findByIdAndUpdate(req.body.id, { responses: req.body.responses }, (err, docs) => {
          if(err){
          console.log(err);
          console.log("Error in updating the form")
          }
          else{
            console.log("Form Successfully Filled")
            res.json({ message: "Form Successfully Filled"})
          }
        })
      }
      else{
        console.log("Form already filled")
        res.json({ message: "Form already filled" });
      }
    }
  })
})

// VIEW INDIVIDUAL RESPONSES //

app.get("/api/individual", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if(err){
      console.log(err);
      console.log("User Not Found")
      res.json({ message: "User Not Found" });
    }
    else{
      if(user.isadmin == true){
        await users.findById(req.body.uid, async function (error, participant) {
          if(error){
            console.log(error);
            console.log("Participant not found")
            res.json({ message: "Participant not found" })
          }
          else{
            res.json({ responses: participant.responses})
          }
        })
      }
      else{
        res.json({ message: "Unauthorized User. Access denied." });
      }
    }
  })
})

// VIEW LIST OF PARTICIPANTS //

app.get("/api/participants", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if(err){
      console.log(err);
      console.log("User Not Found")
      res.json({ message: "User Not Found" });
    }
    else{
      if(user.isadmin == true){
        const uList = await users.find().select('name');
        res.json({ uList: uList});
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
