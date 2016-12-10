var koa = require('koa');
var gzip = require('koa-gzip');
var cors = require('koa-cors');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');

var route = require('./route/');
var session = require('./lib/session');
var errorHander = require('./middleware/error-handler');
var permissionHander = require('./middleware/permission-handler');

var app = koa();
app.keys = [ 'bootstrap' ];
var corsConfig = {
  credentials: true,
  headers: [ 'Content-Type', 'Accept' ],
  methods: [ 'GET', 'POST', 'PATCH', 'HEAD', 'DELETE', 'PUT' ]
};

app.use(gzip());
app.use(logger());
app.use(bodyParser());
app.use(cors(corsConfig));
app.use(function* (next) {
  yield* next;
  console.log(this.response.headers);
  if (this.response.headers['set-cookie'] && this.response.headers['set-cookie'].length) {
    this.response.headers.cookie = this.response.headers['set-cookie'].join(';');
  }
});
// custom middleware
session.bind(app);
app.use(errorHander());
app.use(permissionHander());

route(app);

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  console.log('Node server listening on : ', port);
});

module.exports = server;
