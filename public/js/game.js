(function(window, undefined) {
  var ghg = {};

  var Game = function () {

  }

  Game.prototype = {
    boot: function () {
      this.createWorld();
      this.createPhysics();
      this.createRenderer();
      this.createInput();
      this.createRemote();
    },

    createWorld: function () {
      this.world = {
        planets: [
          {
            x: 600,
            y: 300,
            radius: 50,
            mass: 1e17
          },
          {
            x: 900,
            y: 750,
            radius: 42,
            mass: 1e15
          }
        ],

        player: {
          x: 20,
          y: 20,
          speed: 0,
          turningSpeed: 0,
          angle: 0
        },
        remotePlayers: {}
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

    createInput: function () {
      var that = this;

      that.input = new ghg.Input();

      that.input.on('start-moving-forward', function () {
        that.physics.startMovingFoward();
      });

      that.input.on('start-moving-backward', function () {
        that.physics.startMovingBackward();
      });

      that.input.on('stop-moving', function () {
        that.physics.stopMoving();
      });

      that.input.on('start-turning-left', function () {
        that.physics.startTurningLeft();
      });

      that.input.on('start-turning-right', function () {
        that.physics.startTurningRight();
      });

      that.input.on('stop-turning', function () {
        that.physics.stopTurning();
      });
    },

    createRemote: function() {
      var that = this;
      that.remote = new ghg.Remote({ world: that.world });
    },

    gameLoop: function (t, dt) {
      var that = this;
      that.physics.update(that.world);
      that.remote.sendPlayerPosition(that.world.player);
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