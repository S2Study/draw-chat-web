"use strict";

module.exports = function(sequelize, DataTypes) {
  var Groups = sequelize.define("Groups", {
    group_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Groups.hasMany(models.Messages)
      }
    }
  });

  return Groups;
};