(function(window, undefined) {

window.onload = function()
{
  var game = {};
  var canvas = new Canvas(document.body, 600, 400);

  var circle1 = new Circle(100,
    {
      id: 'myCircle1',
      x: canvas.width / 3,
      y: canvas.height / 2,
      stroke: 'black',
      strokeWidth: 20,
      endAngle: Math.PI*2
    }
  );

  canvas.append(circle1);

  var circle2 = new Circle(100,
    {
      id: 'myCircle2',
      x: canvas.width / 3 * 2,
      y: canvas.height / 2,
      stroke: 'red',
      strokeWidth: 20,
      endAngle: Math.PI*2
    }
  );

  canvas.append(circle2);

  game.canvas = canvas;
  window.game = game;
};
}(window));