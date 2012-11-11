(function(ghg) {

var Renderer = function (options) {
  var that = this;

  that.projectiles = [];

  that.remotePlayers = [];
  that.renderObjects = [];
  that.players = [];
  that.onRender = options.onRender;
  that.world = options.world;
  that.shipColor = 0;


  that._canvas = new Canvas(document.body, window.innerWidth, window.innerHeight);
  that._canvas.addFrameListener(function (t, dt) {
    that.onRender(t, dt);
    that.update(t, dt);
  });
  that.scene = new CanvasNode()
  that._canvas.append(that.scene);

  that.createObjects();
};

Renderer.prototype = {
  resize: function (width, height) {
    var canvas = document.getElementById('canvas-uuid-1');
    canvas.width = width;
    canvas.height = height;

    var canvasContainer = document.getElementById('canvas-uuid-1').parentElement.style;
    canvasContainer.width = width;
    canvasContainer.height = height;
  },

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
      that.scene.append(node);
    });

    that.world.players = [that.world.player];

    _(that.world.players).each(function (player) {
      var node = that.createPlayerRenderer();
      that.players.push(node);
      that.scene.append(node);
    });
  },

  addRemotePlayer: function (remotePlayer) {
    var that = this;

    var renderer = that.createPlayerRenderer();

    that.remotePlayers.push({
      object: remotePlayer,
      renderer: renderer
    });

    that.scene.append(renderer);
  },

  removeRemotePlayerById: function (id) {
    var that = this,
        remotePlayers = that.remotePlayers;

    for (var i = remotePlayers.length - 1; i >= 0; i--) {
      if (id === remotePlayers[i].object.id) {
        remotePlayers[i].renderer.removeSelf();
        remotePlayers.splice(i, 1);
        return;
      }
    };
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

    that.scene.append(renderer);
  },

  explodeProjectile: function (projectile) {
    var that = this,
        projectiles = that.projectiles;

    that.drawExplosion(projectile.x, projectile.y);

    for (var i = projectiles.length - 1; i >= 0; i--) {
      if (projectile === projectiles[i].object) {
        projectiles[i].renderer.removeSelf();
        projectiles.splice(i, 1);
        return;
      }
    };
  },

  drawExplosion: function (x, y) {
    var that = this;

    var glow = new Gradient({
      type : 'radial',
      endRadius : 200,
      colorStops : [
        [ 0.0, "rgba(190,105,90,1)" ],
        [ 0.25, "rgba(5,30,80,0.4)" ],
        [ 1, "rgba(10,0,40,0)" ]
      ]
    });

    var renderer = new Circle(200,
      {
        x: x,
        y: y,
        scale: 1,
        compositeOperation: 'lighter',
        fill: glow
      }
    );

    renderer.animateTo('opacity', 1, 100, 'linear');
    renderer.after(200, function () {
      renderer.animateTo('opacity', 0, 2000, 'sine');
    })
    renderer.after(2200, renderer.removeSelf)
    that.scene.append(renderer);
  },

  update: function (t, dt) {
    var that = this,
        projectiles = that.projectiles,
        remotePlayers = that.remotePlayers;


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



    for (var i = remotePlayers.length - 1; i >= 0; i--) {
      var remotePlayer = remotePlayers[i];
      remotePlayer.renderer.x = remotePlayer.object.x;
      remotePlayer.renderer.y = remotePlayer.object.y;
      remotePlayer.renderer.rotation = remotePlayer.object.angle;

    };

    that.scene.x = window.innerWidth / 2 - that.players[0].x;
    that.scene.y = window.innerHeight / 2 - that.players[0].y;
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
  },

  updatePlayerScore: function (score) {
    var that = this;

    document.getElementById('score').innerHTML = score;
  }
};

ghg.Renderer = Renderer;


}(ghg));