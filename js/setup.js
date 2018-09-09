'use strict';

(function setupModule() {
  var WIZARD_NUMBER = 4;
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var showElement = function (elementName) {
    var element = document.querySelector(elementName);
    element.classList.remove('hidden');
  };

  showElement('.setup');

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
