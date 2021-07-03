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

const MONGO_URL = process.env.MONGO;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// app.use(cors()); // Use this after the variable declaration
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

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
  console.log(success("Logged out successfully"));
  res.json({
    authenticated: false,
    filledForm: false,
    isadmin: false,
    image: null,
    name: null,
  });
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
    console.log("The user has been authenticated");
    res.redirect(process.env.FRONTEND);
  }
);

// CHECK AUTHENTICATED //
app.get("/api/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      authenticated: true,
      filledForm: req.user.responses ? true : false,
      isadmin: req.user.isadmin,
      image: req.user.photo,
      name: req.user.name,
    });
  } else {
    res.json({
      authenticated: false,
      filledForm: false,
      isadmin: false,
      image: null,
      name: null,
    });
  }
});

// view profile
app.get("/api/profile", checkauthentication, (req, res) => {
  console.log(warning("The user data is :"), req.user);
  const { name, phone, roll, branch } = req.user;
  var returnValue = {
    name: name || "",
    roll: roll || "",
    branch: branch || "",
    phone: phone || "",
  };
  console.log(success("The returned value is:"), returnValue);
  res.json(returnValue);
});

app.put("/api/profile", checkauthentication, async (req, res) => {
  try {
    console.log(warning("The updated value is :"), req.body);

    const newUser = await users.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });
    console.log(success("New User is :"), newUser);
    res.json({
      authenticated: true,
      filledForm: newUser.responses ? true : false,
      isadmin: newUser.isadmin,
      image: newUser.photo,
      name: newUser.name,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "There has been a error in updation." });
  }
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
  // console.log(warning("checking if user is an admin : "), req.user);
  if (req.user.isadmin) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.json({ error: "You Are Not Authorized to access this page." });
  }
}

//make admin
app.post(
  "/api/admin",
  checkauthentication,
  checkAdminAuthentication,
  async (req, res) => {
    console.log(warning("The user has to be made an admin:"), req.body);
    try {
      const user = await users.findByIdAndUpdate(
        req.body.id,
        { isadmin: true },
        { new: true }
      );
      console.log(success("The user change has been successful"), user);
      res.json({});
    } catch (err) {
      console.log(warning("An error has occurred:"), err);
      res.json({
        error: "Sorry the user could not be given admin priveleges.",
      });
    }
  }
);
// QUESTIONS //

app.get("/api/questionslist", checkauthentication, async (req, res) => {
  const qList = await questions.find();
  console.log(success("Fetch All questions:"), qList);
  res.json({ qList });
});

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
    console.log(
      warning("The object is being updated:"),
      req.body,
      req.body._id
    );

    const question = await questions.findByIdAndUpdate(
      req.body._id,
      req.body,
      { new: true },
      (err, docs) => {
        if (err) {
          console.log(error("Error in updating"), req.user);
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
    console.log(warning("The questoins has to be deleted:"), req.body.id);
    const question = await questions.findByIdAndDelete(
      req.body.id,
      (err, docs) => {
        if (err) {
          console.log(error("Error in deleting:"), err);
        }
      }
    );
    console.log(
      success("The question has been deleted succesfully:"),
      question
    );
    res.json(req.body.id);
  }
);

// ADD RESPONSES //

app.post("/api/response", checkauthentication, async (req, res) => {
  console.log(req.body);
  try {
    const user = await users.findByIdAndUpdate(
      req.user.id,
      { responses: req.body },
      { new: true }
    );
    console.log(success("Response has been added:"), user);
    res.json({
      authenticated: true,
      filledForm: req.user.responses ? true : false,
      isadmin: req.user.isadmin,
      image: req.user.photo,
      name: req.user.name,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Sorry user could not be added." });
  }
});

// VIEW INDIVIDUAL RESPONSES //

app.get(
  "/api/individual/:id",
  checkauthentication,
  checkAdminAuthentication,
  async (req, res) => {
    console.log(req.body, req.params);
    const { id } = req.params;
    try {
      const user = await users.findById(id);
      if (user.responses) {
        console.log(success("The user responses are:"), user);
        res.json(user);
      } else {
        res.json({ error: "The user has not submitted the form." });
      }
    } catch (error) {
      console.log(error);
      res.json({ error: "An Error Occurred." });
    }
  }
);

// VIEW LIST OF PARTICIPANTS //

app.get(
  "/api/participants",
  checkauthentication,
  checkAdminAuthentication,
  async (req, res) => {
    try {
      const uList = await users.find().select("name isadmin id");
      console.log(success("The list is:"), uList);
      res.json({ uList: uList });
    } catch (error) {
      console.log(error);
      res.json({ error: "Sorry Could not fetch User List" });
    }
  }
);

app.listen(PORT, () => {
  console.log("The server is active on :", PORT);
});
