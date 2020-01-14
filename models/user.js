module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
   
    });

    User.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      User.hasMany(models.Availability, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  