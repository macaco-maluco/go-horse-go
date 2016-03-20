var express = require('express')
  , http = require('http')
  , socketio = require('socket.io')
  , path = require('path');

 var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server)
  , i = 0;

server.listen(80);

var players = [];

app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', function (socket) {
  socket.set('id', i++);

  socket.emit('players', players);

  socket.on('player-connect', function (data) {
    socket.get('id', function (error, id) {
      data.id = id;
      players.push(data);
      socket.broadcast.emit('player-connect', data);
    })
  });

  socket.on('disconnect', function () {
    socket.get('id', function (error, id) {
      for (var i = players.length - 1; i >= 0; i--) {
        var player = players[i];
        if(id === player.id) {
          players.splice(i, 1);
          break;
        }
      };
      socket.broadcast.emit('player-disconnect', id);
    })
  });

  socket.on('position', function (data) {
    socket.get('id', function (error, id) {
      data.id = id;
      socket.volatile.broadcast.emit('position', data);
    })
  });

  socket.on('fire-projectile', function (data) {
    socket.broadcast.emit('fire-projectile', data);
  });
});
