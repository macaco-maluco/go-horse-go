(function(ghg) {

var Renderer = function (options) {
  var that = this;

  that.projectiles = [];

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

    _(that.world.players).each(function (player) {
      var node = that.createPlayerRenderer();
      that.players.push(node);
      that.canvas.append(node);
    });
  },

  addProjectile: function (projectile) {
    var that = this;

    var renderer = new Circle(2,
      {
        x: projectile.x,
        y: projectile.y,
        scale: 1,
        compositeOperation: 'lighter',
        fill: '#2C3CB3'
      }
    );

    that.projectiles.push({
      object: projectile,
      renderer: renderer
    })

    that.canvas.append(renderer);
  },

  explodeProjectile: function (projectile) {
    var that = this,
        projectiles = that.projectiles;

    for (var i = projectiles.length - 1; i >= 0; i--) {
      if (projectile == projectiles[i].object) {
        projectiles[i].renderer.removeSelf();
        projectiles.splice(i, 1);
        return;
      }
    };
  },

  update: function (t, dt) {
    var that = this,
        projectiles = that.projectiles;

    for (var i = projectiles.length - 1; i >= 0; i--) {
      var projectile = projectiles[i];
      projectile.renderer.x = projectile.object.x;
      projectile.renderer.y = projectile.object.y;
    };

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

      renderer = that.createPlayerRenderer();

      that.canvas.append(renderer);
      that.remotePlayersRendererObjects[playerId] = renderer;
    }

    return renderer;
  },

  createPlayerRenderer: function() {
    var that = this;

    var img = new Image();

    img.src = 'images/ship' + ((that.shipColor++ % 4)+1) + '.png';
    var renderer = new ImageNode(img, {
      dWidth: 40,
      dHeight: 40,
      dX: -20,
      dY: -20,
      x: 0,
      y: 0
    });

    return renderer;
  }
};

ghg.Renderer = Renderer;


}(ghg));