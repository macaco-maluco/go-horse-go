(function(ghg) {

var Renderer = function (options) {
  var that = this;
  that.renderObjects = [];
  that.onRender = options.onRender;
  that.world = options.world;

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

    that.playerRenderObject = new Circle(2,
      {
        x: that.world.player.x,
        y: that.world.player.y,
        stroke: 'blue',
        strokeWidth: 2
      }
    );

    that.canvas.append(that.playerRenderObject);
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

    that.playerRenderObject.x = that.world.player.x;
    that.playerRenderObject.y = that.world.player.y;
  }
};

ghg.Renderer = Renderer;


}(ghg));