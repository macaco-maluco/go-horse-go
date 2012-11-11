(function (ghg, undefined) {

var Physics = function (options) {
  var that = this;

  that.eventHandlers = {};
  that.world = options.world;
};

Physics.prototype = {
  update: function (t, dt) {
    var that = this;
        projectiles = that.world.projectiles;

    for (var i = projectiles.length - 1; i >= 0; i--) {
      var projectile = projectiles[i];

      var planetsForce = _(that.world.planets).chain().map(function (planet){
        return that.getForceVector(planet, projectile);
      }).reduce(function (f1, f2) {
        return {
          fx: (f1.fx + f2.fx),
          fy: (f1.fy + f2.fy)
        };
      }).value();

      projectile.fx = projectile.fx + planetsForce.fx;
      projectile.fy = projectile.fy + planetsForce.fy;
      projectile.x = projectile.x + projectile.fx / projectile.mass;
      projectile.y = projectile.y + projectile.fy / projectile.mass;
    };

    that.world.player.x = that.world.player.x + -that.world.player.speed * Math.sin(that.world.player.angle);
    that.world.player.y = that.world.player.y + that.world.player.speed * Math.cos(that.world.player.angle);

    that.world.player.angle = that.world.player.angle + that.world.player.turningSpeed;
  },

  getForceVector: function(planet, projectile) {
    var dx = planet.x - projectile.x,
        dy = planet.y - projectile.y,
        d = Math.sqrt(dx * dx + dy * dy);

    var force = (1e-14 * planet.mass * projectile.mass) / (d * d);

    return { fx: force * dx / d, fy: force * dy / d };
  },

  fireProjectile: function (projectile) {
    var that = this;

    that.world.projectiles.push(projectile);

    setTimeout(function () {
      that.world.projectiles.splice(0, 1);
      that.trigger('projectile-explosion', projectile);
    }, 5000);

    return projectile;
  },

  startMovingFoward: function () {
    var that = this;

    that.world.player.speed = 2;
  },

  startMovingBackward: function () {
    var that = this;

    that.world.player.speed = -3;
  },

  stopMoving: function () {
    var that = this;

    that.world.player.speed = 0;
  },

  startTurningLeft: function () {
    var that = this;

    that.world.player.turningSpeed = -0.1;
  },

  startTurningRight: function () {
    var that = this;

    that.world.player.turningSpeed = 0.1;
  },

  stopTurning: function () {
    var that = this;

    that.world.player.turningSpeed = 0;
  },

  on: function (event, callback) {
    var that = this;
    that.eventHandlers[event] = callback;
  },

  trigger: function (event, data) {
    var that = this;
    that.eventHandlers[event] && that.eventHandlers[event](data);
  }

};
ghg.Physics = Physics;

}(ghg));