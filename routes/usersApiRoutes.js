// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the users
  app.get("/api/users", function (req, res) {
    db.Users.findAll({})
    .then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/users", function (req, res) {
    console.log(req)

    db.Users.create({

      user: req.body.user,
      password: req.body.password

    }).then(function (dbUsers) {

      db.Availability.create({
        UserId: dbUsers.id

      }).then(function (dbAvailability) {

        res.json(dbAvailability)

      })

    }).catch(function (err) {

      res.json({ error: err });

    });
  });

};
