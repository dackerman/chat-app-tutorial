var express = require('express');

var app = express();

app.set('port', (process.env.PORT || 3000));

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
      clients[clientId].ws.send(outMsg, function(error) {
        if (error !== undefined) {
          console.warn('error', error);
        }
      });
    });
  });

  ws.on('close', function() {
    delete clients[clientId];
  });
});

app.use(express.static('public'));

app.listen(app.get('port'));
