"use strict";

module.exports = function (sequelize, DataTypes) {
  var Messages = sequelize.define("Messages", {
    group_id: DataTypes.INTEGER
    ,user_id: DataTypes.STRING
    ,user_name: DataTypes.STRING
    ,message: DataTypes.STRING
    ,image_path: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Messages.belongsTo(models.Groups, {
          onDelete: "CASCADE",
          foreignKey: 'group_id'
        });
      }
    }
  });

  return Messages;
};