module.exports = function (sequelize, DataTypes) {
    let Day_Date = sequelize.define("Day_Date", {
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

    return Day_Date;
};
