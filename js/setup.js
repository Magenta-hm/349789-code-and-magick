'use strict';

(function setupModule() {
  var WIZARD_NUMBER = 4;

  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };

  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var generateWizards = function (wizardCount) {
    var wizardArr = [];
    for (var i = 0; i < wizardCount; i++) {
      wizardArr[i] = {
        name: WIZARD_NAMES[randomInteger(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[randomInteger(0, WIZARD_SURNAMES.length - 1)],
        coatColor: WIZARD_COAT_COLORS[randomInteger(0, WIZARD_COAT_COLORS.length - 1)],
        eyesColor: WIZARD_EYES_COLORS[randomInteger(0, WIZARD_EYES_COLORS.length - 1)]
      };
    }
    return wizardArr;
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
    for (var j = 0; j < arr.length; j++) {
      fragment.appendChild(renderWizard(arr[j]));
    }
    return fragment;
  };

  similarListElement.appendChild(renderWizards(wizards));

  var similarHeroes = document.querySelector('.setup-similar');
  similarHeroes.classList.remove('hidden');
})();
