'use strict';

(function setupModule() {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var WIZARD_NUMBER = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var setRandomColor = function (wizardElement, color) {
    wizardElement.style.fill = color;
  };

  var wizardCoat = document.querySelector('.setup-wizard').querySelector('.wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard').querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = document.querySelector('div.setup-wizard-appearance input[name=coat-color]');
  var wizardEyesInput = document.querySelector('div.setup-wizard-appearance input[name=eyes-color]');
  var fireballInput = document.querySelector('div.setup-fireball-wrap input[name=fireball-color]');

  wizardCoat.addEventListener('click', function () {
    var randomColor = getRandomItem(WIZARD_COAT_COLORS);
    setRandomColor(wizardCoat, randomColor);
    wizardCoatInput.value = randomColor;
  });

  wizardEyes.addEventListener('click', function () {
    var randomColor = getRandomItem(WIZARD_EYES_COLORS);
    setRandomColor(wizardEyes, randomColor);
    wizardEyesInput.value = randomColor;
  });

  fireball.addEventListener('click', function () {
    var randomColor = getRandomItem(FIREBALL_COLORS);
    fireball.style.background = randomColor;
    fireballInput.value = randomColor;
  });

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');

  var showElement = function (elementName) {
    var element = document.querySelector(elementName);
    element.classList.remove('hidden');
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && document.activeElement !== setupUserName) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  setupUserName.addEventListener('invalid', function () {
    if (setupUserName.validity.tooShort) {
      setupUserName.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (setupUserName.validity.tooLong) {
      setupUserName.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (setupUserName.validity.valueMissing) {
      setupUserName.setCustomValidity('Обязательное поле');
    } else {
      setupUserName.setCustomValidity('');
    }
  });

  setupUserName.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var getRandomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    rand = Math.floor(rand);

    return rand;
  };

  var getRandomItem = function (array) {
    return array[getRandomInteger(0, array.length - 1)];
  };

  var generateWizards = function (wizardCount) {
    var tempWizards = [];

    for (var i = 0; i < wizardCount; i++) {
      tempWizards[i] = {
        name: getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES),
        coatColor: getRandomItem(WIZARD_COAT_COLORS),
        eyesColor: getRandomItem(WIZARD_EYES_COLORS)
      };
    }

    return tempWizards;
  };

  var wizards = generateWizards(WIZARD_NUMBER);

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (arr) {
    var fragment = document.createDocumentFragment();

    arr.forEach(function (item) {
      fragment.appendChild(renderWizard(item));
    });

    return fragment;
  };

  similarListElement.appendChild(renderWizards(wizards));

  showElement('.setup-similar');
})();
