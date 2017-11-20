'use strict';

window.renderStatistics = function (ctx, names, times) {
  var boardStatistics = {
    width: 420,
    height: 270,
    initialX: 140,
    initialY: 20,
    style: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowX: 10,
    shadowY: 10
  };

  var taglineStatictics = {
    tagline: 'УРА ВЫ ПОБЕДИЛИ!',
    initialX: 233,
    initialY: 43,
    color: '#e7e27b',
    outlineColor: '#bf9c0d',
    font: '20px PT Mono',
  };

  var textStatistics = {
    text: 'Список результатов:',
    initialX: 150,
    initialY: 65,
    color: '#bf9c0d',
    font: '18px PT Mono'
  };

  var histogramOptions = {
    height: 150,
    width: 40,
    step: 150 / (times[times.length - 1] - 0),
    indent: 90,
    initialX: 170,
    initialY: 260,
    lineHeight: 15
  };

  // Отрисовка доски со статискикой
  ctx.shadowOffsetX = boardStatistics.shadowX;
  ctx.shadowOffsetY = boardStatistics.shadowY;
  ctx.shadowColor = boardStatistics.shadowColor;
  ctx.fillStyle = boardStatistics.style;
  ctx.fillRect(boardStatistics.initialX, boardStatistics.initialY, boardStatistics.width, boardStatistics.height);
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;


  // Отрисовка текста
  ctx.fillStyle = taglineStatictics.color;
  ctx.strokeStyle = taglineStatictics.outlineColor;
  ctx.font = taglineStatictics.font;
  ctx.fillText(taglineStatictics.tagline, taglineStatictics.initialX, taglineStatictics.initialY);
  ctx.strokeText(taglineStatictics.tagline, taglineStatictics.initialX - 3, taglineStatictics.initialY - 3);
  ctx.fillStyle = textStatistics.color;
  ctx.font = textStatistics.font;
  ctx.fillText(textStatistics.text, textStatistics.initialX, textStatistics.initialY);

  // Сортировка по увеличению времени прохождения уровня
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

  // Получение случейной прозрачности
  var getRandomOpacity = function () {
    return Math.random() * (1 - 0.5) + 0.5;
  };

  // Отрисовка гистограмм
  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 67, 122, ' + getRandomOpacity() + ')';
    ctx.fillRect(histogramOptions.initialX + histogramOptions.indent * i, histogramOptions.initialY, histogramOptions.width, times[i] * (-histogramOptions.step));
    ctx.fillText(Math.round(times[i]) + 'мс', histogramOptions.initialX + histogramOptions.indent * i, histogramOptions.initialY + (-histogramOptions.lineHeight) + times[i] * (-histogramOptions.step));
    ctx.fillText(names[i], histogramOptions.initialX + histogramOptions.indent * i, histogramOptions.initialY + histogramOptions.lineHeight);
  }
};
