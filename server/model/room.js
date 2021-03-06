var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('room', {
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
  topicId: {
    allowNull: true,
    field: 'topic_id',
    type: Sequelize.INTEGER
  },
  applierId: {
    allowNull: true,
    field: 'applier_id',
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: true,
    type: Sequelize.STRING
  },
  state: {
    allowNull: true,
    type: Sequelize.INTEGER,
    comment: "房间状态，0表示未申请通过，1表示已申请通过"
  }
}, {
  underscored: true,
  freezeTableName: true
});
