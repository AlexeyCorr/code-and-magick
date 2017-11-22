'use strict';

window.renderStatistics = function (ctx, names, times) {

  // Отрисовка прямоугольника
  var drawRectangle = function (initialX, initialY, width, height) {
    ctx.fillRect(initialX, initialY, width, height);
  };

  // Запись текста
  var writeText = function (text, initialX, initialY, font) {
    ctx.font = font;
    if (!font) {
      (ctx.strokeText(text, initialX, initialY));
    } else {
      (ctx.fillText(text, initialX, initialY));
    }
  };

  // Отрисовка доски со статискикой
  var drawBoardStats = function (shadowColor, rectColor) {
    ctx.fillStyle = shadowColor;
    drawRectangle(150, 30, 420, 270);
    ctx.fillStyle = rectColor;
    drawRectangle(140, 20, 420, 270);
  };

  // Отрисовка слогана
  var drawBoardTagline = function (color, outlineColor) {
    ctx.fillStyle = color;
    ctx.strokeStyle = outlineColor;
    writeText('УРА ВЫ ПОБЕДИЛИ!', 233, 43, '20px PT Mono');
    writeText('УРА ВЫ ПОБЕДИЛИ!', 230, 40);
  };

  // Отрисовка текста
  var drawBoardText = function (color) {
    ctx.fillStyle = color;
    writeText('Список результатов:', 150, 65, '18px PT Mono');
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

  // Получение случайной прозрачности
  var getRandomOpacity = function (max, min) {
    return Math.random() * (max - min) + min;
  };

  // Отрисовка гистограмм
  var drawHistogram = function (height, indent, lineHeight) {

    var step = height / (times[times.length - 1] - 0);

    for (var i = 0; i < times.length; i++) {
      ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 67, 122, ' + getRandomOpacity(1, 0.5) + ')';
      drawRectangle(170 + indent * i, 260, 40, times[i] * (-step));
      writeText(Math.round(times[i]) + 'мс', 170 + indent * i, 260 + (-lineHeight) + times[i] * (-step), '18px PT Mono');
      writeText(names[i], 170 + indent * i, 260 + lineHeight, '18px PT Mono');
    }
  };

  drawBoardStats('rgba(0, 0, 0, 0.7)', 'rgba(255, 255, 255, 1)');

  drawBoardTagline('#e7e27b', '#bf9c0d');

  drawBoardText('#bf9c0d');

  sortTimes(times[0], names[0]);

  drawHistogram(150, 90, 15);
};
