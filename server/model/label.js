var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('label', {
  id: {
    comment: '主键',
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: true,
    type: Sequelize.STRING
  },
  parentId: {
    allowNull: false,
    field: 'parent_id',
    type: Sequelize.INTEGER
  }
}, {
  underscored: true,
  freezeTableName: true
});
