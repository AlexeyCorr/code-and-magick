'use strict';

window.renderStatistics = function (ctx, names, times) {
  var boardStyle = {
    color: 'rgba(255, 255, 255, 1)',
    shadowColor: 'rgba(0, 0, 0, 0.7)',
  };

  var taglineStatictics = {
    tagline: 'УРА ВЫ ПОБЕДИЛИ!',
    color: '#e7e27b',
    outlineColor: '#bf9c0d',
    font: '20px PT Mono',
  };

  var textStatistics = {
    text: 'Список результатов:',
    color: '#bf9c0d',
    font: '18px PT Mono'
  };

  var histogramOptions = {
    indent: 90,
    lineHeight: 15
  };

  // Отрисовка доски со статискикой
  var drawBoardStats = function (initialX, initialY, width, height) {
    ctx.fillStyle = boardStyle.shadowColor;
    ctx.fillRect(initialX + 10, initialY + 10, width, height);
    ctx.fillStyle = boardStyle.color;
    ctx.fillRect(initialX, initialY, width, height);
  };

  // Отрисовка слогана
  var drawBoardTagline = function (initialX, initialY) {
    ctx.fillStyle = taglineStatictics.color;
    ctx.strokeStyle = taglineStatictics.outlineColor;
    ctx.font = taglineStatictics.font;
    ctx.fillText(taglineStatictics.tagline, initialX, initialY);
    ctx.strokeText(taglineStatictics.tagline, initialX - 3, initialY - 3);
  };

  // Отрисовка текста
  var drawBoardText = function (initialX, initialY) {
    ctx.fillStyle = textStatistics.color;
    ctx.font = textStatistics.font;
    ctx.fillText(textStatistics.text, initialX, initialY);
  };

  // Сортировка по увеличению времени прохождения уровня
  var sortTimes = function (minTime, minName) {
    for (var i = 0; i <= times.length - 2; i++) {
      minTime = times[i];
      minName = names[i];

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
  };

  // Получение случейной прозрачности
  var getRandomOpacity = function () {
    return Math.random() * (1 - 0.5) + 0.5;
  };

  // Отрисовка гистограмм
  var drawHistogram = function (initialX, initialY, width, height) {

    var step = height / (times[times.length - 1] - 0);

    for (var i = 0; i < times.length; i++) {
      ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 67, 122, ' + getRandomOpacity() + ')';
      ctx.fillRect(initialX + histogramOptions.indent * i, initialY, width, times[i] * (-step));
      ctx.fillText(Math.round(times[i]) + 'мс', initialX + histogramOptions.indent * i, initialY + (-histogramOptions.lineHeight) + times[i] * (-step));
      ctx.fillText(names[i], initialX + histogramOptions.indent * i, initialY + histogramOptions.lineHeight);
    }
  };

  drawBoardStats(140, 20, 420, 270);

  drawBoardTagline(233, 43);

  drawBoardText(150, 65);

  sortTimes(times[0], names[0]);

  drawHistogram(170, 260, 40, 150);
};
