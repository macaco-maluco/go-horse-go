(function(ghg) {

var Remote = function(options) {
  var that = this;
  that.eventHandlers = {};

  that.world = options.world;
  that.socket = io.connect('http://'+window.location.host);

  that.socket.emit('player-connect', that.world.player);

  that.socket.on('players', function (data) {
    console.log('player-connect-massive', data);
    for (var i = data.length - 1; i >= 0; i--) {
      var player = data[i];
      that.trigger('player-connect', player);
    };
  });

  that.socket.on('player-connect', function (data) {
    console.log('player-connect', data);
    that.trigger('player-connect', data);
  });

  that.socket.on('position', function(data) {
    that.trigger('player-position', data);
  });
  that.socket.on('fire-projectile', function (data) {
    that.trigger('fire-projectile', data);
  });

  that.socket.on('player-disconnect', function(id) {
    console.log('player-disconnect', id);
    that.trigger('player-disconnect', id);
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
