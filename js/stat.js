'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var HORIZONTAL_GAP = 50;
  var VERTICAL_GAP = 80;
  var FONT_GAP = 16;
  var BAR_WIDTH = 40;
  var BAR_HEIGHT = 150;

  var renderCloud = function (args) {
    args.ctx.fillStyle = args.color;
    args.ctx.fillRect(args.x, args.y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    arr.forEach(function (element) {
      if (element > maxElement) {
        maxElement = element;
      }
    });

    return maxElement;
  };

  var getBlueTint = function () {
    return 'rgba(0, 0, ' + Math.round(Math.random() * 255) + ', 1)';
  };

  var renderCloudHead = function (ctx) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillText('Ура вы победили!', 110, 30);
    ctx.fillText('Список результатов:', 110, 48);
  };

  var renderToCanvas = function (args) {
    args.ctx.save();
    args.fn(args.ctx);
    args.ctx.restore();
  };

  window.renderStatistics = function (ctx, names, times) {
    renderToCanvas({
      ctx: ctx,
      fn: function (protectedCtx) {
        renderCloud({
          ctx: protectedCtx,
          x: CLOUD_X + 10,
          y: CLOUD_Y + 10,
          color: 'rgba(0, 0, 0, .7)',
        });
      },
    });
    renderToCanvas({
      ctx: ctx,
      fn: function (protectedCtx) {
        renderCloud({
          ctx: protectedCtx,
          x: CLOUD_X,
          y: CLOUD_Y,
          color: '#fff',
        });
      },
    });

    renderToCanvas({
      ctx: ctx,
      fn: renderCloudHead,
    });

    var maxTime = getMaxElement(times);
    var onePart = Math.round(maxTime / BAR_HEIGHT);

    names.forEach(function (name, i) {
      renderToCanvas({
        ctx: ctx,
        fn: function (protectedCtx) {
          var barHeight = Math.round(times[i] / onePart);
          var verticalIndent = BAR_HEIGHT - barHeight;
          var xPosition = CLOUD_X + (HORIZONTAL_GAP + BAR_WIDTH) * (i + 1) - BAR_WIDTH;
          var yPosition = CLOUD_Y + VERTICAL_GAP + verticalIndent;

          if (name === 'Вы') {
            protectedCtx.fillStyle = 'rgba(255, 0, 0, 1)';
          } else {
            protectedCtx.fillStyle = getBlueTint();
          }

          protectedCtx.fillRect(xPosition, yPosition, BAR_WIDTH, barHeight);
          protectedCtx.fillStyle = '#000';
          protectedCtx.fillText(name, xPosition, yPosition + barHeight + FONT_GAP);
          protectedCtx.fillText(Math.round(times[i]), xPosition, yPosition - FONT_GAP / 2);
        },
      });
    });
  };
})();
