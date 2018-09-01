'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_X = 60;
var GAP_Y = 25;
var TEXT_HEIGHT = 20;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();

  ctx.moveTo(120 + x, 55 + y);
  ctx.bezierCurveTo(135 + x, 0 + y, 190 + x, 10 + y, 235 + x, 20 + y);
  ctx.bezierCurveTo(235 + x, 5 + y, 325 + x, 10 + y, 345 + x, 20 + y);
  ctx.bezierCurveTo(360 + x, 5 + y, 445 + x, 15 + y, 440 + x, 35 + y);
  ctx.bezierCurveTo(460 + x, 30 + y, 505 + x, 35 + y, 490 + x, 90 + y);
  ctx.bezierCurveTo(490 + x, 75 + y, 520 + x, 130 + y, 490 + x, 170 + y);
  ctx.bezierCurveTo(515 + x, 230 + y, 455 + x, 270 + y, 440 + x, 250 + y);
  ctx.bezierCurveTo(430 + x, 270 + y, 360 + x, 270 + y, 360 + x, 255 + y);
  ctx.bezierCurveTo(330 + x, 275 + y, 240 + x, 265 + y, 230 + x, 255 + y);
  ctx.bezierCurveTo(200 + x, 285 + y, 130 + x, 250 + y, 140 + x, 205 + y);
  ctx.bezierCurveTo(100 + x, 215 + y, 95 + x, 100 + y, 120 + x, 80 + y);

  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var renderHeader = function (ctx, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + TEXT_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

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
  ctx.fillRect(CLOUD_X + GAP_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + GAP_Y + TEXT_HEIGHT * 2 + 5 + BAR_MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 10, 10, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 0, 0, '#fff');

  renderHeader(ctx, CLOUD_X + GAP_X, CLOUD_Y + GAP_Y);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderPlayerResult(ctx, i, names[i], times[i], (BAR_MAX_HEIGHT * times[i]) / maxTime);
  }

};
