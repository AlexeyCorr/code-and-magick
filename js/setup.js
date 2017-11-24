'use strict';

// Возможные параметры волшебников
var WIZARD_OPTIONS = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green']
};

var heroField = document.querySelector('.setup');
heroField.classList.remove('hidden');
heroField.querySelector('.setup-similar').classList.remove('hidden');

var similarListHero = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

// Получение случайного значения
var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Получение случайного параметра
var getRandomOption = function (options) {
  if (!options) {
    var fullName = WIZARD_OPTIONS.names[getRandomValue(0, WIZARD_OPTIONS.names.length - 1)] + ' ' + WIZARD_OPTIONS.surnames[getRandomValue(0, WIZARD_OPTIONS.names.length - 1)];

    return fullName;
  } else {
    var randomColor = options[getRandomValue(0, WIZARD_OPTIONS.names.length - 1)];

    return randomColor;
  }
};

// Массив с похожими волшебниками
var wizards = [
  {
    fullName: getRandomOption(),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  },
  {
    fullName: getRandomOption(),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  },
  {
    fullName: getRandomOption(),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  },
  {
    fullName: getRandomOption(),
    coatColors: getRandomOption(WIZARD_OPTIONS.coatColors),
    eyesColors: getRandomOption(WIZARD_OPTIONS.eyesColors)
  }
];

// Создание случайного волшебника
var createWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColors;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColors;

  return wizardElement;
};

// Отрисовска фрагмента со случайными волшебниками
var drawWizards = function () {
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(createWizard(wizards[i]));
  }
  return similarListHero.appendChild(fragment);
};

drawWizards();
