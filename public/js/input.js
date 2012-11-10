(function(ghg, undefined) {
  var Input = function () {
    var that = this;
    that.eventHandlers = {};

    KeyboardJS.on('up',
      function () {
        that.trigger('start-moving-forward');
      },
      function () {
        that.trigger('stop-moving');
      }
    );

    KeyboardJS.on('down',
      function () {
        that.trigger('start-moving-backward');
      },
      function () {
        that.trigger('stop-moving');
      }
    );

    KeyboardJS.on('left',
      function () {
        that.trigger('start-turning-left');
      },
      function () {
        that.trigger('stop-turning');
      }
    );

    KeyboardJS.on('right',
      function () {
        that.trigger('start-turning-right');
      },
      function () {
        that.trigger('stop-turning');
      }
    );
  }

  Input.prototype = {
    on: function (event, callback) {
      var that = this;
      that.eventHandlers[event] = callback;
    },
    trigger: function (event) {
      var that = this;
      that.eventHandlers[event] && that.eventHandlers[event]();
    }
  }

  ghg.Input = Input;

}(ghg));