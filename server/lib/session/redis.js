var RedisStore = require('koa-redis');
var redisConfig = require('config').get('redis');

module.exports = function () {
  return new RedisStore({
    "host": redisConfig.host,
    "port": redisConfig.port,
    "auth_pass": redisConfig.auth_pass
  });
};
