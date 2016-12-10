var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('topic', {
  id: {
    comment: '主键',
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  ownerId: {
    allowNull: true,
    field: 'owner_id',
    type: Sequelize.INTEGER
  },
  content: {
    allowNull: true,
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});
