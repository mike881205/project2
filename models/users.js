module.exports = function (sequelize, DataTypes) {
  let Users = sequelize.define("Users", {
    user: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Users.associate = function (models) {
    Users.hasMany(models.Availability, {
      onDelete: "cascade"
    });
  };

  return Users;
};
