'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
     Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    var result = queryInterface.dropAllTables();
    result = queryInterface.createTable(
      'groups',
      {
        id: {
          type: Sequelize.INTEGER
          ,primaryKey: true
          ,autoIncrement: true
        }
        ,createdAt: {
          type: Sequelize.DATE
          ,allowNull: false
        }
        ,updatedAt: {
          type: Sequelize.DATE
          ,allowNull: false
        }
        ,group_name: {
          type: Sequelize.STRING
          ,allowNull: false
        }
        ,group_count: {
          type: Sequelize.INTEGER
          ,allowNull: false
          ,defaultValue: 0
        }
      }
    );
    result = queryInterface.createTable(
      'messages',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }
        ,createdAt: {
          type: Sequelize.DATE
          ,allowNull: false
        }
        ,updatedAt: {
          type: Sequelize.DATE
          ,allowNull: false
        }
        ,group_id: {
          type: Sequelize.INTEGER
          ,allowNull: false
        }
        ,user_id: {
          type: Sequelize.STRING
          ,allowNull: false
        }
        ,user_name: {
          type: Sequelize.STRING
          ,allowNull: false
        }
        ,message: {
          type: Sequelize.STRING
        }
        ,image_path: {
          type: Sequelize.STRING
        }
      }
    );
    return result;
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropAllTables();
  }
};
