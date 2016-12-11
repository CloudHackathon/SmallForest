var User = require('./user');
var sequelize = require('./db');
var Profile = require('./profile');
var Label = require('./label');
var Message = require('./message');
var Room = require('./room');
var Topic = require('./topic');
var Notice = require('./notice');
var LabelTopic = require('./label-topic');

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

Topic.belongsToMany(Label, { as: 'labels', through: 'label_topic', foreignKey: 'topicId' })
Label.belongsToMany(Topic, { as: 'topics', through: 'label_topic', foreignKey: 'labelId' })

Notice.belongsTo(Topic, {
  foreignKey: 'topicId'
});

Model.User = User;
Model.Profile = Profile;
Model.Label = Label;
Model.Topic = Topic;
Model.Room = Room;
Model.Message = Message;
Model.Notice = Notice;
Model.LabelTopic = LabelTopic;

Model.sequelize = sequelize;
