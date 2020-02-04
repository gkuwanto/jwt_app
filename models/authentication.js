'use strict';
module.exports = (sequelize, DataTypes) => {
  const authentication = sequelize.define('authentication', {
    username: {
      type: DataTypes.STRING, 
      unique: 'compositeIndex',
      allowNull: false
    },
    password: DataTypes.STRING
  }, {});
  authentication.associate = function(models) {
    // associations can be defined here
  };
  return authentication;
};