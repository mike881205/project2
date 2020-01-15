module.exports = function (sequelize, DataTypes) {
    let Dates = sequelize.define("Dates", {
        day1: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day2: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day3: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day4: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day5: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day6: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day7: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        }
    });

    return Dates;
};
