'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  userDialog.classList.remove('hidden');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  var names = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var lastNames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];
  var colors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var eyesColor = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var generateName = function (firstNames, surnames) {
    var name = window.getRandomElement(firstNames);
    var surname = window.getRandomElement(surnames);
    return name + ' ' + surname;
  };

  var generateWizards = function () {
    return Array(4).fill().map(function () {
      return {
        name: generateName(names, lastNames),
        coatColor: window.getRandomElement(colors),
        eyesColor: window.getRandomElement(eyesColor)
      };
    });
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();
  generateWizards().forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
})();
