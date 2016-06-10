var express = require('express');

var app = express();

var expressWs = require('express-ws')(app);

var nextId = 1;
var clients = {};

app.ws('/chat', function(ws, req) {
  var clientId = nextId;
  clients[clientId] = { ws: ws };
  nextId++;
  ws.on('message', function(msgString){
    var inMsg = JSON.parse(msgString);
    var outMsg = JSON.stringify({
      clientId: clientId,
      message: inMsg.message
    });

    Object.keys(clients).forEach(function(clientId) {
      clients[clientId].ws.send(outMsg);
    });
  });
});

app.use(express.static('public'));

app.listen(3000);
