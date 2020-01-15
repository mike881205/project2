// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

    app.get("/api/dates", function (req, res) {

        db.Dates.findAll({}).then(function (dbDates) {
            res.json(dbDates);
        });

    });

    app.post("/api/dates", function (req, res) {

        db.Dates.create({
            day1: req.body.day1,
            day2: req.body.day2,
            day3: req.body.day3,
            day4: req.body.day4,
            day5: req.body.day5,
            day6: req.body.day6,
            day7: req.body.day7
        }).then(function (dbDates) {
            res.json(dbDates);
        })
            .catch(function (err) {
                res.json(err);
            });

    });

    app.put("/api/dates", function (req, res) {

        db.Dates.update({
            day1: req.body.day1,
            day2: req.body.day2,
            day3: req.body.day3,
            day4: req.body.day4,
            day5: req.body.day5,
            day6: req.body.day6,
            day7: req.body.day7
        }, {
            where: {
                id: req.body.id
            }
        }).then(function (dbDates) {
            res.json(dbDates);
        })
            .catch(function (err) {
                res.json(err);
            });
    });
};
