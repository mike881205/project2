module.exports = function (sequelize, DataTypes) {
  let Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Users.associate = function (models) {
    // Associating Author with Posts
    // When an Author is deleted, also delete any associated Posts
    Users.hasMany(models.Availability, {
      onDelete: "cascade"
    });
  };

  return Users;
};
