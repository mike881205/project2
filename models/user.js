module.exports = function(sequelize, DataTypes) {
    let User = sequelize.define("User", {
      name: DataTypes.STRING,
      flag: {allowNull: false}
    });
  
    return User;
  };
  