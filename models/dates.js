module.exports = function (sequelize, DataTypes) {
    let Dates = sequelize.define("Dates", {
        year: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        week: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day1_date: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day2_date: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day3_date: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day4_date: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day5_date: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day6_date: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        },
        day7_date: {
            type: DataTypes.INTEGER,
            flag: {allowNull: false}
        }
    });

    return Dates;
};
