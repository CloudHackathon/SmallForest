var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('profile', {
  id: {
    comment: '主键',
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  userId: {
    allowNull: false,
    field: 'user_id',
    type: Sequelize.INTEGER
  },
  nickname: {
    allowNull: false,
    type: Sequelize.STRING
  },
  avatar: {
    allowNull: false,
    type: Sequelize.STRING
  },
  gender: {
    allowNull: true,
    type: Sequelize.ENUM('MALE', 'FEMALE', 'TRANS', 'AGENDER', 'ANDROGYNE')
  },
  qq: {
    allowNull: true,
    type: Sequelize.STRING
  },
  wechat: {
    allowNull: true,
    type: Sequelize.STRING
  },
  address: {
    allowNull: true,
    type: Sequelize.STRING
  },
  email: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING
  },
  mobile: {
    unique: true,
    allowNull: false,
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});
