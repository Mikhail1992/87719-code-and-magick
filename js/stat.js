var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var HORIZONTAL_GAP = 50;
var VARTICAL_GAP = 80;
var FONT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function(ctx, names, times) {
  renderCloud(ctx, CLOUD_X + 10, CLOUD_Y + 10, 'rgba(0, 0, 0, .7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 110, 30);
  ctx.fillText('Список результатов:', 110, 48);

  var maxTime = getMaxElement(times);
  var onePart = Math.round(maxTime / BAR_HEIGHT);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, '+ Math.round(Math.random() * 255) + ', 1)';
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    var barHeight = Math.round(times[i] / onePart);
    var verticalIndent = BAR_HEIGHT - barHeight;
    var xPosition = CLOUD_X + (HORIZONTAL_GAP + BAR_WIDTH) * (i + 1) - BAR_WIDTH;
    var yPosition = CLOUD_Y + VARTICAL_GAP + verticalIndent;

    ctx.fillRect(xPosition, yPosition, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], xPosition, yPosition + barHeight + FONT_GAP);
    ctx.fillText(Math.round(times[i]), xPosition, yPosition - FONT_GAP);
  }
};
