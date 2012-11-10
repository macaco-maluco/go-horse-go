var express = require('express')
  , http = require('http')
  , socketio = require('socket.io')
  , path = require('path');

 var app = express()
  , server = http.createServer(app)
  , io = socketio.listen(server);


server.listen(8000);

// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on('connection', function (socket) {
  socket.on('position', function (data) {
    console.log(data);
    socket.broadcast.emit('position', data);
  });
});