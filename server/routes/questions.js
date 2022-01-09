const passport = require("passport");
const users = require("../models/users");
const questions = require("../models/questions");
const { checkauthentication } = require("../middleware/users");
const { checkAdminAuthentication } = require("../middleware/users");
const { success, warning, error } = require("../services/chalk");

// QUESTIONS //
module.exports = (app) => {
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
};