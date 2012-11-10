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
            x: 600,
            y: 300,
            radius: 50,
            mass: 1e17
          }
        ]
      };
    },

    createPhysics: function () {
      var that = this;
      that.physics = new ghg.Physics({ world: that.world });
    },

    createRenderer: function () {
      var that = this;

      that.renderer = new ghg.Renderer({
        onRender: function (t, dt) {
          that.gameLoop(t, dt);
        },
        world: that.world
      });
    },

    gameLoop: function (t, dt) {
      var that = this;
      that.physics.update(that.world);
    },

    fireProjectile: function (x, y, fx, fy) {
      var that = this;
      that.physics.fireProjectile(x, y, fx, fy);
    }
  };

  ghg.Game = Game;
  window.ghg = ghg;

  window.onload = function() {
    var game = new ghg.Game();
    game.boot();
    game.fireProjectile(300, 300, 0, 20);
  };
}(window));