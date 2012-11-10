(function (ghg, undefined) {

var Physics = function (options) {
  var that = this;

  that.world = options.world;
};

Physics.prototype = {
  update: function (t, dt) {
    var that = this;

    if (that.world.projectile) {
      var planetsForce = _(that.world.planets).chain().map(function (planet){
        return that.getForceVector(planet, that.world.projectile);
      }).reduce(function (f1, f2) {
        return {
          fx: (f1.fx + f2.fx),
          fy: (f1.fy + f2.fy)
        };
      }).value();

      that.world.projectile.x = that.world.projectile.x + planetsForce.fx;
      that.world.projectile.y = that.world.projectile.y + planetsForce.fy;
    }
  },

  getForceVector: function(planet, projectile) {
    var dx = planet.x - projectile.x,
        dy = planet.y - projectile.y,
        d = Math.sqrt(dx * dx + dy * dy);

    var force = (1 * planet.mass * 1) / (d * d);

    return { fx: force * dx / d, fy: force * dy / d };
  },

  fireProjectile: function (x, y, force, angle) {
    var that = this;

    that.world.projectile = {
      x: x,
      y: y,
      force: force,
      angle: angle
    };
  }
};
// physics.updateWorld(world);
// physics.fireParticle(x, y, force);

// canvas.onFrame(function (t, dt) {
//   physics.update(dt);
// })

// physics.on('colision', function (obj1, obj2) {

// });
ghg.Physics = Physics;

}(ghg));