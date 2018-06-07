'use strict';

(function () {
  window.getRandomElement = function (arr) {
    var random = Math.floor(Math.random() * arr.length);
    return arr[random];
  };
})();
