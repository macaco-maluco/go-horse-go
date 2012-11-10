(function(ghg) {

var Remote = function(options) {
  var that = this;
  that.world = options.world;
  that.socket = io.connect('http://192.168.1.9:8000');
  that.socket.on('position', function(data) {
    that.world.remotePlayers[data.id] = data;
  });
};

Remote.prototype = {
  sendPlayerPosition: function (player) {
    var that = this;
    that.socket.emit('position', player);
  }
}


ghg.Remote = Remote;
}(ghg));
