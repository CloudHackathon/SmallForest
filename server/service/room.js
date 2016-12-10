var assert = require('assert');

var Model = require('../model');
var Utils = require('../utils');

var User = Model.User;
var Room = Model.Room;
var Message = Model.Message;

var RoomService = module.exports;

RoomService.getMessages = function(roomId) {

  return Message
    .findAll({ where: { roomId: roomId } });

};

RoomService.sendMessage = function(message) {

  return Message.create(message);

};
