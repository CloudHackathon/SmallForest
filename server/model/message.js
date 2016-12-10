var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('message', {
  id: {
    comment: '主键',
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  roomId: {
    allowNull: true,
    field: 'room_id',
    type: Sequelize.INTEGER
  },
  senderId: {
    allowNull: true,
    field: 'sender_id',
    type: Sequelize.INTEGER
  },
  type: {
    allowNull: true,
    type: Sequelize.INTEGER
  },
  text: {
    allowNull: true,
    type: Sequelize.STRING
  },
  imageUrl: {
    allowNull: true,
    type: Sequelize.STRING
  },
  audioUrl: {
    allowNull: true,
    type: Sequelize.STRING
  }
}, {
  underscored: true,
  freezeTableName: true
});
