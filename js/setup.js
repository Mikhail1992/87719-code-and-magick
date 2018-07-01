'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  var renderWizard = function (args) {
    var wizardElement = args.parentNode.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = args.wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = args.wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = args.wizard.colorEyes;

    return wizardElement;
  };

  var setRandomValue = function (args) {
    var value = window.utils.getRandomElement(args.list);
    args.input.value = value;
    args.node.style[args.rule] = value;
  };

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onSuccessLoadWizzards = function (data) {
    var wizzards = window.utils.generateShuffleArrayPart(data, 4);

    wizzards.forEach(function (wizard) {
      fragment.appendChild(renderWizard({
        wizard: wizard,
        parentNode: similarWizardTemplate,
      }));
    });

    similarListElement.appendChild(fragment);
  };
  window.backend.load(onSuccessLoadWizzards, errorHandler);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');
  var userDialogOpen = document.querySelector('.setup-open');
  userDialogOpen.addEventListener('click', function () {
    window.utils.showElement(userDialog);
    userDialog.focus();
  });

  var userDialogClose = document.querySelector('.setup-close');
  userDialogClose.addEventListener('click', function () {
    window.utils.hideElement(userDialog);
  });

  userDialogClose.addEventListener('keydown', function () {
    if (event.keyCode === ENTER_KEYCODE) {
      window.utils.hideElement(userDialog);
    }
  });

  var userDialogOpenIcon = userDialogOpen.querySelector('.setup-open-icon');
  userDialogOpenIcon.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEYCODE) {
      window.utils.showElement(userDialog);
    }
  });

  userDialog.addEventListener('keydown', function (event) {
    var target = event.target;
    if (event.keyCode === ESC_KEYCODE && target.nodeName !== 'INPUT') {
      window.utils.hideElement(userDialog);
    }
  });

  var currentWizardCoatInput = document.getElementsByName('coat-color')[0];
  var currentWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  currentWizardCoat.addEventListener('click', function () {
    setRandomValue({
      list: colors,
      input: currentWizardCoatInput,
      node: currentWizardCoat,
      rule: 'fill',
    });
  });

  var currentWizardEyesInput = document.getElementsByName('eyes-color')[0];
  var currentWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  currentWizardEyes.addEventListener('click', function () {
    setRandomValue({
      list: eyesColor,
      input: currentWizardEyesInput,
      node: currentWizardEyes,
      rule: 'fill',
    });
  });

  var currentWizardFireballInput = document.getElementsByName('fireball-color')[0];
  var currentWizardFireball = document.querySelector('.setup-fireball-wrap');
  currentWizardFireball.addEventListener('click', function () {
    setRandomValue({
      list: fireballColor,
      input: currentWizardFireballInput,
      node: currentWizardFireball,
      rule: 'background',
    });
  });

  var wizzardsForm = document.querySelector('.setup-wizard-form');
  wizzardsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var onSuccessSaveWizzard = function () {
      window.utils.hideElement(userDialog);
    };

    var formData = new FormData(wizzardsForm);
    window.backend.save(formData, onSuccessSaveWizzard, errorHandler);
  });
})();
