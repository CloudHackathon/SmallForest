var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('notice', {
  id: {
    comment: '主键',
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  topicId: {
    allowNull: true,
    field: 'topic_id',
    type: Sequelize.INTEGER
  },
  userId: {
    allowNull: true,
    field: 'user_id',
    type: Sequelize.INTEGER
  },
  action: {
    allowNull: true,
    type: Sequelize.INTEGER,
    comment: "用户操作，0表示加入话题，1表示会话关闭，2表示会话超时"
  },
  message: {
    allowNull: true,
    type: Sequelize.INTEGER
  }
}, {
  underscored: true,
  freezeTableName: true
});
