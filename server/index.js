const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const chalk = require("chalk");

// import the environment variables
require("dotenv").config();



const PORT = process.env.PORT || 5000;

var passport = require("passport");
require("./passport/passportgoogle")(passport);

const MONGO_URL = process.env.MONGO;

mongoose.connect('mongodb+srv://ankitpratap04:ankitpapa@cluster0.pkvjlgv.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(()=>{
  console.log("connected to the database succeessfully")
});

// Use this after the variable declaration
// allow cookies to be passed from frontend url
const corsOptions = {
  origin: 'http://localhost:3000',
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

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

// console.log(process.env.NODE_ENV === "production");

// if (process.env.NODE_ENV === "production") {
//   //Express will serve up the index.html file in production
//   //if it dosent recognize the route even on client side
//   console.log("This is in production");

//   const path = require("path");
//   app.use(express.static(path.join(__dirname, "client/build")));

//   app.get("*", (req, res) => {
//     console.log("Sending front end assets");
//     res.sendFile(path.join(__dirname, "client/build/index.html"));
//   });
// }

app.listen(5000, () => {
  console.log("The server is active on :", PORT);
});
