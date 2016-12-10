var User = require('./user');
var sequelize = require('./db');
var Profile = require('./profile');
var Label = require('./label');
var Message = require('./message');
var Room = require('./room');
var Topic = require('./topic');

var Model = exports;

/**
 * Relation between user and profile is 1:1
 */
User.hasOne(Profile, {
  as: 'profile',
  foreignKey: 'userId'
});

User.hasMany(Topic, {
  as: 'topics',
  foreignKey: 'ownerId'
});

User.belongsToMany(Topic, {
  foreignKey: 'applierId',
  through: Room
});

Room.hasMany(Message, {
  as: 'messages',
  foreignKey: 'roomId'
});

Topic.hasMany(Room, {
  as: 'rooms',
  foreignKey: 'topicId'
});

Topic.hasMany(Label, {
  'as': 'labels'
});

Label.hasMany(Topic, {
  'as': 'topics'
});

Model.User = User;
Model.Profile = Profile;
Model.Label = Label;
Model.Topic = Topic;
Model.Room = Room;
Model.Message = Message;

Model.sequelize = sequelize;
