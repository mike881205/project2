const moment = require("moment")

module.exports = function (sequelize, DataTypes) {
    let Availability = sequelize.define("Availability", {
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: moment().format("YYYY")
        },
        week: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: moment().format("W")
        },
        day1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        day2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        day3: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        day4: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        day5: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        day6: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        day7: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    });

    Availability.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Availability.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Availability;
};
