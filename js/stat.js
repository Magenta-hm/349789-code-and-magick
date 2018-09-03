'use strict';

(function statModule() {
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var GAP_X = 60;
  var GAP_Y = 25;
  var GAP_SHADOW = 10;
  var TEXT_HEIGHT = 20;
  var BAR_MAX_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var GAP_TEXT_PADDING = 5;

  var renderCloud = function (ctx) {

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(CLOUD_X + GAP_SHADOW, CLOUD_Y + GAP_SHADOW, CLOUD_WIDTH, CLOUD_HEIGHT);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  var renderHeader = function (ctx, x, y) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура, вы победили!', x, y);
    ctx.fillText('Список результатов:', x, y + TEXT_HEIGHT);
  };

  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    arr.forEach(function (item) {
      if (item > maxElement) {
        maxElement = item;
      }
    });
    return maxElement;
  };

  var renderPlayerResult = function (ctx, i, name, time, barHeight) {
    ctx.fillStyle = '#000';
    ctx.fillText(name, CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP_Y + TEXT_HEIGHT * 2 + BAR_MAX_HEIGHT - barHeight);
    ctx.fillText(Math.round(time), CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP_Y + TEXT_HEIGHT * 3 + BAR_MAX_HEIGHT);
    if (name === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    ctx.fillRect(CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP_Y + TEXT_HEIGHT * 2 + GAP_TEXT_PADDING + BAR_MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);
  };

  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx);

    renderHeader(ctx, CLOUD_X + GAP_X, CLOUD_Y + GAP_Y);

    var maxTime = getMaxElement(times);

    names.forEach(function (item, i) {
      renderPlayerResult(ctx, i, names[i], times[i], (BAR_MAX_HEIGHT * times[i]) / maxTime);
    });
  };
})();
