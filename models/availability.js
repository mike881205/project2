module.exports = function (sequelize, DataTypes) {
    let Availability = sequelize.define("Availability", {
        day1: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            flag: {allowNull: false}
        },
        day2: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            flag: {allowNull: false}
        },
        day3: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            flag: {allowNull: false}
        },
        day4: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            flag: {allowNull: false}
        },
        day5: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            flag: {allowNull: false}
        },
        day6: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            flag: {allowNull: false}
        },
        day7: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
            flag: {allowNull: false}
        }
    });

    return Availability;
};
