'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(140, 20, 420, 270);
  ctx.fillStyle = 'rgba(255, 255, 255, 1)';
  ctx.fillRect(130, 10, 420, 270);

  ctx.fillStyle = '#e7e27b';
  ctx.strokeStyle = '#bf9c0d';
  ctx.font = '20px PT Mono';

  ctx.fillText('УРА ВЫ ПОБЕДИЛИ!', 233, 43);
  ctx.strokeText('УРА ВЫ ПОБЕДИЛИ!', 230, 40);
  ctx.fillStyle = '#bf9c0d';
  ctx.font = '18px PT Mono';
  ctx.fillText('Список результатов:', 150, 65);

  for (var i = 0; i <= times.length - 2; i++) {
    var minTime = times[i];
    var minName = names[i];

    for (var j = i + 1; j <= times.length - 1; j++) {
      if (times[j] < minTime) {
        minTime = times[j];
        minName = names[j];
        var swapTime = times[i];
        var swapName = names[i];
        times[i] = minTime;
        names[i] = minName;
        times[j] = swapTime;
        names[j] = swapName;
      }
    }
  }

  var histogramHeigth = 150;
  var step = histogramHeigth / (times[times.length - 1] - 0);

  var histogramWidth = 40;
  var indent = 90;
  var initialX = 170;
  var initialY = 260;
  var lineHeight = 15;

  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 67, 122, ' + (Math.random() * (1 - 0.5) + 0.5) + ')';
    }
    ctx.fillRect(initialX + indent * i, initialY, histogramWidth, times[i] * (-step));
    ctx.fillText(Math.round(times[i]), initialX + indent * i, initialY + (-lineHeight) + times[i] * (-step));
    ctx.fillText(names[i], initialX + indent * i, initialY + lineHeight);
  }
};
