module.exports = function (sequelize, DataTypes) {
    let Availability = sequelize.define("Availability", {
        day1: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            flag: { allowNull: false }
        },
        day2: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            flag: { allowNull: false }
        },
        day3: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            flag: { allowNull: false }
        },
        day4: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            flag: { allowNull: false }
        },
        day5: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            flag: { allowNull: false }
        },
        day6: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            flag: { allowNull: false }
        },
        day7: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            flag: { allowNull: false }
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
