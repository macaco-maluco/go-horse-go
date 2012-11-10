(function(ghg) {

var Renderer = function (options) {
  var that = this;
  that.renderObjects = [];
  that.onRender = options.onRender;
  that.world = options.world;

  that.canvas = new Canvas(document.body, 600, 400);
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
  }
};

ghg.Renderer = Renderer;


}(ghg));