(function (ghg, undefined) {

var Physics = function (options) {
  var that = this;

  that.world = options.world;
};

Physics.prototype = {
  update: function (t, dt) {
    var that = this,
        projectile = that.world.projectile;

    if (projectile) {
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
    }
  },

  getForceVector: function(planet, projectile) {
    var dx = planet.x - projectile.x,
        dy = planet.y - projectile.y,
        d = Math.sqrt(dx * dx + dy * dy);

    var force = (1e-14 * planet.mass * projectile.mass) / (d * d);

    return { fx: force * dx / d, fy: force * dy / d };
  },

  fireProjectile: function (x, y, fx, fy) {
    var that = this;

    that.world.projectile = {
      x: x,
      y: y,
      fx: fx || 0,
      fy: fy || 0,
      mass: 10
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