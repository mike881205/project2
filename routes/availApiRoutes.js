// Requiring our models
const db = require("../models");
const moment = require("moment")

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/api/availability/", function (req, res) {

    db.Availability.findAll({}).then(function(dbAvailability) {
      res.json(dbAvailability)
    })

  })

  app.get("/api/availability/:id", function(req, res) {
    db.Availability.findOne({
      where: {
        id: req.params.memberId
      },
      include: [db.User]
    }).then(function(dbAvailability) {
      res.json(dbAvailability);
    });
  });

  app.put("/api/availability", function (req, res) {

    db.Availability.update(
      {
        day1: req.body.day1,
        day2: req.body.day2,
        day3: req.body.day3,
        day4: req.body.day4,
        day5: req.body.day5,
        day6: req.body.day6,
        day7: req.body.day7
      },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(function (dbAvailability) {
      res.json(dbAvailability);
    })
      .catch(function (err) {
        res.json(err)
      });

  })

};
