'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = document.querySelector('.setup-close');
  var userDialogOpenIcon = userDialogOpen.querySelector('.setup-open-icon');
  var userDialogName = userDialog.querySelector('.setup-user-name');
  var currentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var currentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var currentWizardFireball = document.querySelector('.setup-fireball-wrap');
  var currentWizardCoatInput = document.getElementsByName('coat-color')[0];
  var currentWizardEyesInput = document.getElementsByName('eyes-color')[0];
  var currentWizardFireballInput = document.getElementsByName('fireball-color')[0];
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
  var fireballColor = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var generateName = function (firstNames, surnames) {
    var name = window.utils.getRandomElement(firstNames);
    var surname = window.utils.getRandomElement(surnames);
    return name + ' ' + surname;
  };

  var generateWizards = function () {
    return Array(4).fill().map(function () {
      return {
        name: generateName(names, lastNames),
        coatColor: window.utils.getRandomElement(colors),
        eyesColor: window.utils.getRandomElement(eyesColor)
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

  userDialogOpen.addEventListener('click', function () {
    window.utils.showElement(userDialog);
  });

  userDialogClose.addEventListener('click', function () {
    window.utils.hideElement(userDialog);
  });

  userDialogClose.addEventListener('keydown', function () {
    if (event.keyCode === 13) {
      window.utils.hideElement(userDialog);
    }
  });

  userDialogOpenIcon.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      window.utils.showElement(userDialog);
    }
  });

  userDialog.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
      window.utils.hideElement(userDialog);
    }
  });

  userDialogName.addEventListener('focus', function (event) {
    event.stopPropagation();
  });

  currentWizardCoat.addEventListener('click', function () {
    var color = window.utils.getRandomElement(colors);
    currentWizardCoatInput.value = color;
    currentWizardCoat.style.fill = color;
  });

  currentWizardEyes.addEventListener('click', function () {
    var color = window.utils.getRandomElement(eyesColor);
    currentWizardEyesInput.value = color;
    currentWizardEyes.style.fill = color;
  });

  currentWizardFireball.addEventListener('click', function () {
    var color = window.utils.getRandomElement(fireballColor);
    currentWizardFireballInput.value = color;
    currentWizardFireball.style.background = color;
  });
})();
