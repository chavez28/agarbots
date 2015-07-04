var Knex = require('knex');
var MoronModel = require('moron').MoronModel;
var WebSocketServer = require('ws').Server;
var app = require('./app');
var handlers = require('./websocket_handlers');
var knexfile = require('../knexfile');

// TODO(ibash) make this respect the NODE_ENV
var knex = Knex(knexfile.development);
MoronModel.knex(knex);

var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

var wss = new WebSocketServer({server: server, path: '/socket'});
wss.on('connection', handlers.onConnection);
