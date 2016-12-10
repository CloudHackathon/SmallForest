var route = require('koa-route');

var user = require('./user.js');
var room = require('./room.js');
var topic = require('./topic.js');

module.exports = function (app) {
  app.use(route.get('/noop', function* (next) {
    this.body = 'ok';
    yield* next;
  }));

  /*
   User API
   */
  app.use(route.post('/auth/random', user.random));
  app.use(route.post('/auth/login', user.login));
  app.use(route.post('/auth/regist', user.createUser));
  app.use(route.get('/auth/email/:email', user.checkEmail));
  app.use(route.get('/auth/mobile/:mobile', user.checkMobile));
  app.use(route.get('/auth/valid-code/:mobile', user.getValidCode));

  app.use(route.get('/auth/captcha-image/:email', user.captchaImage));
  app.use(route.get('/auth/user/:email/:captchaCode', user.getInfoByEmail));
  app.use(route.put('/auth/reset-password/:email', user.resetPassword));

  app.use(route.get('/users/:id', user.getUser));
  app.use(route.post('/users', user.createUser));
  app.use(route.put('/users/:id', user.updateUser));
  app.use(route.post('/users/init', user.init));

  app.use(route.put('/profile/:id', user.updateProfile));

  app.use(route.get('/users/:id/topics', user.getOwnedTopics));
  app.use(route.get('/users/:id/topics/applied', user.getAppliedTopics));
  app.use(route.get('/topics/:id/rooms', topic.getRooms));
  app.use(route.get('/rooms/:id/messages', room.getMessages));

  app.use(route.post('/users/:id/topics', user.postTopic));
  app.use(route.post('/topics/:id/rooms', topic.createRoom));
  app.use(route.post('/rooms/:id/messages', room.createMessage))

  app.use(route.delete('/topics/:topicId/rooms/:roomId', topic.deleteRoom))

};
