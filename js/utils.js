'use strict';

(function () {
  window.utils = {
    getRandomElement: function (arr) {
      var random = Math.floor(Math.random() * arr.length);
      return arr[random];
    },

    hideElement: function (node) {
      node.classList.add('hidden');
    },

    showElement: function (node) {
      node.classList.remove('hidden');
    },
  };
})();
