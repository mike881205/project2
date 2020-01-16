// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the users
  app.get("/api/users", function (req, res) {
    db.Users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/users", function (req, res) {
    db.Users.create({
      user: req.body.user,
      password: req.body.password
    }).then(function (dbUsers) {
      res.json(dbUsers);
    })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.delete("/api/users/:id", function (req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });

  });

};
