(function(ghg) {

var Remote = function(options) {
  var that = this;
  that.world = options.world;
  that.socket = io.connect('http://'+window.location.host);
  that.socket.on('position', function(data) {
    that.world.remotePlayers[data.id] = data;
  });

  that.sendPlayerPositionThrottled = _.throttle(function (player) {
    var that = this;
    that.socket.emit('position', player);
  }, 200);
};

Remote.prototype = {
  sendPlayerPosition: function (player) {
    var that = this;
    that.sendPlayerPositionThrottled(player);
  }
}


ghg.Remote = Remote;
}(ghg));
