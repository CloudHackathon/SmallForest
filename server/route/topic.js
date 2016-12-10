var topicService = require('../service/topic');

module.exports = {
  getRooms: getRooms,
  createRoom: createRoom,
  deleteRoom: deleteRoom,
  listTopics: listTopics
};

function* getRooms(id) {
  this.body = yield topicService.getRooms(id);
}

function* createRoom(id) {
  var body = this.request.body;
  if (!body) {
    throw Exception.create(Exception.Types.BadRequest, '缺少必要参数');
  }
  body.topicId = id;
  body.applierId = this.session.id;
  var result = yield topicService.applyTopic(body);
  if (!result) {
    throw Exception.create(Exception.Types.ServerError, '申请倾听失败');
  }
  this.body = result;
}

function* deleteRoom(topicId, roomId) {
  var result = yield topicService.deleteRoom(topicId, roomId);
  if (!result) {
    throw Exception.create(Exception.Types.ServerError, '退出话题失败');
  }
  this.body = result;
}

function* listTopics() {
  var lableIdStr = this.request.query.labelIds;
  if (!lableIdStr) {
    throw Exception.create(Exception.Types.BadRequest, '参数错误');
  }
  var labelIds = lableIdStr.split(',').map(function (item) {
    return item.trim();
  });
  var result = yield topicService.listTopics(labelIds);
  if (!result) {
    throw Exception.create(Exception.Types.ServerError, '获取话题列表失败');
  }
  this.body = result;
}
