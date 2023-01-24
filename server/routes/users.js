const passport = require("passport");
const users = require("../models/users");
const { checkauthentication } = require("../middleware/users");
const { checkAdminAuthentication } = require("../middleware/users");
const { success, warning } = require("../services/chalk");

module.exports = (app) => {
  // AUTH /
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
        isSuperAdmin: req.user.isSuperAdmin,
        image: req.user.photo,
        name: req.user.name,
        
      });
    } else {
      res.json({
        authenticated: false,
        filledForm: false,
        isadmin: false,
        isSuperAdmin: false,
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
        isSuperAdmin: newUser.isSuperAdmin,
        image: newUser.photo,
        name: newUser.name,
      });
    } catch (err) {
      console.log(err);
      res.json({ error: "There has been a error in updation." });
    }
  });

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

  // Logout route
  app.get("/auth/logout", function (req, res) {
    req.logout();
    console.log(success("Logged out successfully"));
    res.json({
      authenticated: false,
      filledForm: false,
      isadmin: false,
      isSuperAdmin: false,
      image: null,
      name: null,
    });
  });
};
