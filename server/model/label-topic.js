var Sequelize = require('sequelize');

var sequelize = require('./db.js');

module.exports = sequelize.define('label-topic', {
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
  labelId: {
    allowNull: true,
    field: 'label_id',
    type: Sequelize.INTEGER
  }
}, {
  underscored: true,
  freezeTableName: true
});
