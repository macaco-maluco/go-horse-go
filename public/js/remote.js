(function(ghg) {

var Remote = function(options) {
  var that = this;
  that.eventHandlers = {};

  that.world = options.world;
  that.socket = io.connect('http://'+window.location.host);
  that.socket.on('position', function(data) {
    that.world.remotePlayers[data.id] = data;
  });
  that.socket.on('fire-projectile', function (data) {
    that.trigger('fire-projectile', data);
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
  },

  sendProjectileShoot: function (projectile) {
    var that = this;

    that.socket.emit('fire-projectile', projectile);
  },

  on: function (event, callback) {
    var that = this;
    that.eventHandlers[event] = callback;
  },
  trigger: function (event, data) {
    var that = this;
    that.eventHandlers[event] && that.eventHandlers[event](data);
  }
}


ghg.Remote = Remote;
}(ghg));
