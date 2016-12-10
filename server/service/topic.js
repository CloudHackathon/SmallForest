var assert = require('assert');

var Model = require('../model');
var Utils = require('../utils');

var User = Model.User;
var Room = Model.Room;
var Topic = Model.Topic;

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
    return Room.create(room);
  });

};
