'use strict';

(function () {
  window.utils = {};
  window.utils.getRandomElement = function (arr) {
    var random = Math.floor(Math.random() * arr.length);
    return arr[random];
  };
})();
