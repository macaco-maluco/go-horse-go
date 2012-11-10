(function(ghg) {

var Renderer = function (options) {
  var that = this;
  that.remotePlayersRendererObjects = [];
  that.renderObjects = [];
  that.players = [];
  that.onRender = options.onRender;
  that.world = options.world;
  that.shipColor = 0;


  that.canvas = new Canvas(document.body, window.innerWidth, window.innerHeight);
  that.canvas.addFrameListener(function (t, dt) {
    that.onRender(t, dt);
    that.update(t, dt);
  });

  that.createObjects();
};

Renderer.prototype = {
  createObjects: function () {
    var that = this;

    _(that.world.planets).each(function (planet) {
      var img = new Image();
      img.src = 'images/planet' + Math.floor((Math.random()*7)+1) + '.png';
      var node = new ImageNode(img, {
        dWidth: planet.radius * 2,
        dHeight: planet.radius * 2,
        x: planet.x - planet.radius,
        y: planet.y - planet.radius
      });


      that.renderObjects.push(node);
      that.canvas.append(node);
    });

    that.world.players = [that.world.player];

    var shipColor = 0;

    _(that.world.players).each(function (player) {
      var img = new Image();
      img.src = 'images/ship' + ((that.shipColor++ % 4)+1) + '.png';
      var node = new ImageNode(img, {
        dWidth: 40,
        dHeight: 40,
        dX: -20,
        dY: -20,
        x: player.x,
        y: player.y
      });

      that.players.push(node);
      that.canvas.append(node);
    });
  },

  update: function (t, dt) {
    var that = this;

    if (that.world.projectile && !that.projectilesRenderObject) {
      var projectile = that.world.projectile;

      that.projectilesRenderObject = new Circle(2,
        {
          id: '435436544',
          x: projectile.x,
          y: projectile.y,
          stroke: 'red',
          strokeWidth: 2,
          endAngle: Math.PI*2
        }
      );

      that.canvas.append(that.projectilesRenderObject);
    };

    if (that.projectilesRenderObject) {
      that.projectilesRenderObject.x = that.world.projectile.x;
      that.projectilesRenderObject.y = that.world.projectile.y;
    }

    _(that.players).each(function(player){
      player.x = that.world.player.x;
      player.y = that.world.player.y;
      player.rotation = that.world.player.angle;
    });

    _(that.world.remotePlayers).each(function(player){
      var renderer = that.getRemotePlayerRenderer(player.id);

      renderer.x = player.x;
      renderer.y = player.y;
      renderer.rotation = player.angle;
    });
  },

  getRemotePlayerRenderer: function (playerId) {
    var that = this;

    var renderer = that.remotePlayersRendererObjects[playerId];

    if(!renderer) {

      var img = new Image();
      img.src = 'images/ship' + ((that.shipColor++ % 4)+1) + '.png';
      renderer = new ImageNode(img, {
        dWidth: 40,
        dHeight: 40,
        dX: -20,
        dY: -20,
        x: 0,
        y: 0
      });


      that.canvas.append(renderer);
      that.remotePlayersRendererObjects[playerId] = renderer;
    }

    return renderer;
  }
};

ghg.Renderer = Renderer;


}(ghg));