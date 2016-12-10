var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('user', {
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
  email: {
    allowNull: true,
    type: Sequelize.STRING
  },
  password: {
    allowNull: false,
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});
