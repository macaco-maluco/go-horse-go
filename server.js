var express = require('express')
  , http = require('http')
  , socketio = require('socket.io')
  , path = require('path');

 var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server)
  , i = 0;


server.listen(8000);

app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', function (socket) {
  socket.set('id', i++);

  socket.on('position', function (data) {
    socket.get('id', function (error, id) {
      data.id = id;
      socket.volatile.broadcast.emit('position', data);
    })
  });

  socket.on('fire-projectile', function (data) {
    socket.broadcast.emit('fire-projectile', data);
  });

  socket.on('player-connect', function (data) {
    socket.get('id', function (error, id) {
      data.id = id;
      socket.broadcast.emit('player-connect', data);
    })
  });

  socket.on('disconnect', function () {
    socket.get('id', function (error, id) {
      socket.broadcast.emit('player-disconnect', id);
    })
  });
});