(function (ghg, undefined) {

var Physics = function (options) {
  var that = this;

  that.world = options.world;
};

Physics.prototype = {
  update: function (t, dt) {
    var that = this;

    if (that.world.projectile) {
      that.world.projectile.x = that.world.projectile.x + 1
    }
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