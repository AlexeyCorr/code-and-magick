'use strict';

// Возможные параметры волшебников
var WIZARD_OPTIONS = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  surnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  eyesColors: ['black', 'red', 'blue', 'yellow', 'green'],
  fireballColors: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

// --------- ОБРАБОТКА СОБЫТИЙ -----------

var openWindowHero = function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var heroField = document.querySelector('.setup');
  var buttonOpen = document.querySelector('.setup-open');
  var buttonClose = heroField.querySelector('.setup-close');
  var buttonSubmit = heroField.querySelector('.setup-submit');
  var nameField = heroField.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && evt.target !== nameField) {
      closePopup(evt);
    }
  };

  var openPopup = function () {
    heroField.classList.remove('hidden');
    heroField.querySelector('.setup-similar').classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    heroField.classList.add('hidden');
    heroField.querySelector('.setup-similar').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  buttonOpen.addEventListener('click', function () {
    openPopup();
  });

  buttonOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  buttonClose.addEventListener('click', function () {
    closePopup();
  });

  buttonClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  buttonSubmit.addEventListener('submit', function (evt) {
    if (!nameField.value) {
      evt.preventDefault();
      closePopup();
    }
  });
};
var changeMyWizard = function () {

  var myWizard = document.querySelector('.setup-player');
  var coatMyWizard = myWizard.querySelector('.wizard-coat');
  var eyesMyWizard = myWizard.querySelector('.wizard-eyes');
  var fireballMyWizard = myWizard.querySelector('.setup-fireball-wrap');

  var onWizardClick = function (evt) {
    var target = evt.target;

    while (target !== myWizard) {
      if (target === coatMyWizard) {
        coatMyWizard.style.fill = getRandomOption(WIZARD_OPTIONS.coatColors);
      }
      if (target === eyesMyWizard) {
        eyesMyWizard.style.fill = getRandomOption(WIZARD_OPTIONS.eyesColors);
      }
      if (target === fireballMyWizard) {
        fireballMyWizard.style.backgroundColor = getRandomOption(WIZARD_OPTIONS.fireballColors);
      }
      target = target.parentNode;
    }
  };

  myWizard.addEventListener('click', function (evt) {
    onWizardClick(evt);
  });
};


// ----------------

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

openWindowHero();

changeMyWizard();

drawWizards();
