var roomService = require('../service/room');

module.exports = {
  getMessages: getMessages,
  createMessage: createMessage
};

function* getMessages(id) {
  this.body = yield roomService.getMessages(id);
}

function* createMessage(id) {
  var body = this.request.body;
  if (!body) {
    throw Exception.create(Exception.Types.BadRequest, '缺少参数');
  }
  body.roomId = id;
  body.senderId = this.session.id;
  this.body = yield roomService.sendMessage(body);
}
