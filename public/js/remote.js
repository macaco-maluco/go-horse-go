(function(ghg) {

var Remote = function() {
  var that = this;
  that.socket = io.connect('http://localhost:8000');
  that.socket.on('position', function(data) {
    console.log(data);
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
