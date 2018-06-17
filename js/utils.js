'use strict';

(function () {
  window.utils = {};
  window.utils.getRandomElement = function (arr) {
    var random = Math.floor(Math.random() * arr.length);
    return arr[random];
  };

  window.utils.hideElement = function (node) {
    node.classList.add('hidden');
  };

  window.utils.showElement = function (node) {
    node.classList.remove('hidden');
  };
})();
