(function(window, undefined) {



  var ghg = {};

  var Game = function () {

  }

  Game.prototype = {
    boot: function () {
      this.createWorld();
      this.createPhysics();
      this.createRenderer();
    },

    createWorld: function () {
      this.world = {
        planets: [
          {
            x: 10,
            y: 20,
            radius: 50
          }
        ]
      };
    },

    createPhysics: function () {
      var that = this;
      that.physics = {
        update: function(world) {
          if (world.projectile) {
            world.projectile.x = world.projectile.x + 1
          }
        }
      };
    },

    createRenderer: function () {
      var that = this;

      that.renderObjects = [];
      that.canvas = new Canvas(document.body, 600, 400);

      _(that.world.planets).each(function (planet) {
        var circle = new Circle(planet.radius,
          {
            id: '123123123',
            x: planet.x,
            y: planet.y,
            stroke: 'red',
            strokeWidth: 2,
            endAngle: Math.PI*2
          }
        );

        that.renderObjects.push(circle);
        that.canvas.append(circle);
      })

      that.canvas.addFrameListener(function (t, dt) {
        that.gameLoop(t, dt);
      })
    },

    gameLoop: function (t, dt) {
      var that = this;
      that.physics.update(that.world);

      if (that.projectilesRenderObject) {
        that.projectilesRenderObject.x = that.world.projectile.x;
      }
    },

    fireProjectile: function (x, y, force, angle) {
      var that = this;

      that.world.projectile = {
        x: x, y: y, force: force, angle: angle
      };

      that.projectilesRenderObject = new Circle(2,
        {
          id: '435436544',
          x: x,
          y: y,
          stroke: 'red',
          strokeWidth: 2,
          endAngle: Math.PI*2
        }
      );

      that.canvas.append(that.projectilesRenderObject);
    }
  };

  ghg.Game = Game;
  window.ghg = ghg;

  window.onload = function() {
    var game = new ghg.Game();
    game.boot();
    game.fireProjectile(5, 5, 10, 10);
  };
}(window));