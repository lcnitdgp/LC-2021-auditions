const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const users = require("./models/users");
const questions = require("./models/questions");
var passport = require("passport");
require("./passport/passportgoogle")(passport);
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const chalk = require("chalk");

const MONGO_URL = "mongodb://localhost/auditions";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify : false,
  useCreateIndex : true
});

app.use(cors()); // Use this after the variable declaration

//middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//to inform passport to use cookie based auth
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //token expires after 30 days
    keys: ["murtaza1234"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  console.log("Hello", req.user);
  res.json(req.user);
});

// define chalk themes
const success = chalk.green.bold;
const error = chalk.red.bold;
const warning = chalk.yellow.bold;

// AUTH //

app.get("/auth/logout", function (req, res) {
  req.logout();
  res.json({ message: "Logged out successfully" });
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
    res.json(req.user);
  }
);

// CHECK AUTHENTICATED //

app.get("/api/current", checkauthentication, (req, res) => {
  res.json(true);
});
function checkauthentication(req, res, next) {
  console.log(warning("checking if user is authenticated."), req.user);
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json({ error: "Please Login To The Website." });
  }
}
function checkAdminAuthentication(req, res, next) {
  console.log(warning("checking if user is an admin : "), req.user);
  if (req.user.isadmin) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.json({ error: "You Are Not Authorized to access this page." });
  }
}

// QUESTIONS //

app.get(
  "/api/questionslist",
  checkauthentication,
  checkAdminAuthentication,
  async (req, res) => {
    const qList = await questions.find();
    console.log(success("Fetch All questions:"), qList);
    res.json({ qList });
  }
);

app.post(
  "/api/questionsadd",
  checkauthentication,
  checkAdminAuthentication,
  async (req, res) => {
    if (req.body.type === "range") req.body.options = [0, 0];
    const question = await questions.create({
      content: req.body.content,
      fields: req.body.fields,
      options: req.body.options,
      type: req.body.type,
      image: req.body.image,
    });
    console.log(success("Question Added Successfully:"), req.body, question);
    res.json(question);
  }
);

app.put(
  "/api/questionsupdate",
  checkauthentication,
  checkAdminAuthentication,
  async (req, res) => {
    console.log(warning("The object is being updated:"),req.body,req.body._id);

    const question = await questions.findByIdAndUpdate(
      req.body._id,
      req.body,
      {new: true},
      (err, docs) => {
        if (err) {
          console.log(error("Error in updating"),req.user);
          res.json({ error: "An error occured while updating." });
        }
      }
    );
    console.log(question);
    res.json(question);
  }
);

app.delete(
  "/api/questionsdelete",
  checkauthentication,
  checkAdminAuthentication,
  async (req, res) => {
    console.log(warning("The questoins has to be deleted:"),req.body.id);
    const question = await questions.findByIdAndDelete(req.body.id, (err, docs) => {
      if (err) {
        console.log(error("Error in deleting:"), err);
      }
    });
    console.log(success("The question has been deleted succesfully:"),question);
    res.json(req.body.id);
  }
);

// ADD RESPONSES //

app.post("/api/response", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if (err) {
      console.log(err);
      console.log("User Not Found");
      res.json({ message: "User Not Found" });
    } else {
      if (user.responses.length === 0) {
        await users.findByIdAndUpdate(
          req.body.id,
          { responses: req.body.responses },
          (err, docs) => {
            if (err) {
              console.log(err);
              console.log("Error in updating the form");
            } else {
              console.log("Form Successfully Filled");
              res.json({ message: "Form Successfully Filled" });
            }
          }
        );
      } else {
        console.log("Form already filled");
        res.json({ message: "Form already filled" });
      }
    }
  });
});

// VIEW INDIVIDUAL RESPONSES //

app.get("/api/individual", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if (err) {
      console.log(err);
      console.log("User Not Found");
      res.json({ message: "User Not Found" });
    } else {
      if (user.isadmin == true) {
        await users.findById(req.body.uid, async function (error, participant) {
          if (error) {
            console.log(error);
            console.log("Participant not found");
            res.json({ message: "Participant not found" });
          } else {
            res.json({ responses: participant.responses });
          }
        });
      } else {
        res.json({ message: "Unauthorized User. Access denied." });
      }
    }
  });
});

// VIEW LIST OF PARTICIPANTS //

app.get("/api/participants", async (req, res) => {
  await users.findById(req.body.id, async function (err, user) {
    if (err) {
      console.log(err);
      console.log("User Not Found");
      res.json({ message: "User Not Found" });
    } else {
      if (user.isadmin == true) {
        const uList = await users.find().select("name");
        res.json({ uList: uList });
      } else {
        res.json({ message: "Unauthorized User. Access denied." });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log("The server is active on :", PORT);
});
