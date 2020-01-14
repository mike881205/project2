module.exports = function(sequelize, DataTypes) {
    let Friend = sequelize.define("Friend", {
      // Giving the Friend model a name of type STRING
      name: DataTypes.STRING
    });
  
    Friend.associate = function(models) {
      // Associating Friend with Posts
      // When an Friend is deleted, also delete any associated Posts
      Friend.hasMany(models.Schedule, {
        onDelete: "cascade"
      });
    };
  
    return Friend;
  };
  