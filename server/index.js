const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const chalk = require("chalk");
const PORT = process.env.PORT || 5000;

// import the environment variables
require("dotenv").config();

var passport = require("passport");
require("./passport/passportgoogle")(passport);

const MONGO_URL = process.env.MONGO;

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Use this after the variable declaration
// allow cookies to be passed from frontend url
app.use(cors({ credentials: true, origin: process.env.FRONTEND }));

//middleware
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());

//to inform passport to use cookie based auth
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //token expires after 30 days
    keys: [process.env.SECRET],
  })
);

// Inititalize passport

// passport.initialize() middlewareis responsible for bootstrapping
// the Passport module and the passport.session() middleware which is using
// the Express session to keep track of your user’s session.

app.use(passport.initialize());
app.use(passport.session());

// import the routes
require("./routes/users")(app);
require("./routes/questions")(app);

app.listen(PORT, () => {
  console.log("The server is active on :", PORT);
});
