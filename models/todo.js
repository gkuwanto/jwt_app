'use strict';
module.exports = (sequelize, DataTypes) => {
  const todo = sequelize.define('todo', {
    title: DataTypes.STRING
  }, {});
  todo.associate = function(models) {
    // associations can be defined here
  };
  return todo;
};