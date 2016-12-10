var assert = require('assert');

var Model = require('../model');
var Utils = require('../utils');

var User = Model.User;
var Room = Model.Room;
var Topic = Model.Topic;
var Notice = Model.Notice;

var TopicService = module.exports;

TopicService.getRooms = function(topicId) {

  return Room
    .findAll({ where: { topicId: topicId } });

};

TopicService.applyTopic = function(room) {

  return Topic.findOne({
    where: { id: room.topicId }
  }).then(function (topic) {
    if (!topic || !topic.id) {
      return Promise.reject('该会话不存在');
    }
    room.ownerId = topic.ownerId;
    room.state = 0;
    return Room
      .create(room)
      .then(function (result) {
        Notice.create({
          userId: room.applierId,
          topicId: room.topicId,
          action: 0,
          message: '新用户加入话题'
        });
        return result;
      });
  });

};

TopicService.deleteRoom = function(topicId, roomId) {
  return Room
    .findOne({ where: { id: roomId } })
    .then(function (room) {
      if (!room || !room.id) {
        return Promise.reject('房间不存在');
      }
      return room
        .destroy()
        .then(function() {
          Notice.create({
            userId: room.applierId,
            topicId: topicId,
            action: 1,
            message: '退出话题'
          });
          return true;
        });
    })

};
