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

    shuffle: function (array) {
      var size = array.length;
      var temp;
      var index;

      while (size > 0) {
        index = Math.floor(Math.random() * size);
        size--;
        temp = array[size];
        array[size] = array[index];
        array[index] = temp;
      }

      return array;
    },

    generateArrayPart: function (arr, arrLength) {
      var indexArr = Array(arr.length).fill().map(function (item, index) {
        return index;
      });
      var newArrayIndexes = indexArr.slice(0, arrLength);
      return newArrayIndexes.map(function (index) {
        return arr[index];
      });
    }
  };
})();
