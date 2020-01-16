
// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/api/availability", function (req, res) {

    let query = {};
    if (req.query.users_id) {
      query.UsersId = req.query.users_id;
    }

    db.Availability.findAll({
      where: query,
      include: [db.Availability]
    }).then(function (dbAvailability) {
      res.json(dbAvailability);
    });

  });

  app.get("/api/availability/:id", function (req, res) {

    db.Availability.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Availability]
    }).then(function (dbAvailability) {
      res.json(dbAvailability);
    });
  });

  app.post("/api/availability", function (req, res) {

    db.availability.create({
      year: req.body.year,
      week: req.body.week,
      day1: req.body.day1,
      day2: req.body.day2,
      day3: req.body.day3,
      day4: req.body.day4,
      day5: req.body.day5,
      day6: req.body.day6,
      day7: req.body.day7
    }).then(function (dbAvailability) {
      res.json(dbAvailability);
    })
      .catch(function (err) {
        res.json(err);
      });

  });

  app.delete("/api/availability/:id", function (req, res) {
    db.Availability.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbAvailability) {
      res.json(dbAvailability);
    });
  });

  app.put("/api/availability", function (req, res) {
    db.Availability.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbAvailability) {
        res.json(dbAvailability);
      });
  });
};
