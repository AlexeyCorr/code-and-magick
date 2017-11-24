'use strict';

// Возможные параметры волшебников
var WIZARD_OPTIONS = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};

// Показывает поле с персонажем
var removeClass = function (className) {
  var heroField = document.querySelector('.setup');
  heroField.classList.remove(className);
  heroField.querySelector('.setup-similar').classList.remove(className);

  return heroField;
};

// Получение случайного значения
var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Получение случайного имени
var getRandomName = function (names, surnames) {
  var fullName = [names[getRandomValue(0, names.length - 1)] + ' ' + surnames[getRandomValue(0, names.length - 1)], surnames[getRandomValue(0, names.length - 1)] + ' ' + names[getRandomValue(0, names.length - 1)]];

  return fullName[getRandomValue(0, 1)];
};

// Получение случайного параметра
var getRandomOption = function (options) {
  var randomColor = options[getRandomValue(0, WIZARD_OPTIONS.names.length - 1)];

  return randomColor;
};

// Массив с похожими волшебниками
var wizards = [
  {
    fullName: getRandomName(WIZARD_OPTIONS.names, WIZARD_OPTIONS.surnames),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  },
  {
    fullName: getRandomName(WIZARD_OPTIONS.names, WIZARD_OPTIONS.surnames),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  },
  {
    fullName: getRandomName(WIZARD_OPTIONS.names, WIZARD_OPTIONS.surnames),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  },
  {
    fullName: getRandomName(WIZARD_OPTIONS.names, WIZARD_OPTIONS.surnames),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  }
];

// Создание случайного волшебника
var createWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColors;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColors;

  return wizardElement;
};

// Отрисовска фрагмента со случайными волшебниками
var drawWizards = function () {
  var fragment = document.createDocumentFragment();
  var similarListHero = document.querySelector('.setup-similar-list');

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }
  return similarListHero.appendChild(fragment);
};

removeClass('hidden');

drawWizards();
