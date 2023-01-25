const { success, warning } = require("../services/chalk");

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
function checkSuperAdminAuthentication(req, res, next) {
  // console.log(warning("checking if user is an admin : "), req.user);
  if (req.user.isSuperAdmin) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.json({ error: "You Are Not Authorized to access this page." });
  }
}

module.exports = { checkauthentication, checkAdminAuthentication,checkSuperAdminAuthentication };
