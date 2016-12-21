(function () {
  if (typeof utils === "undefined") {
    window.utils = {};
  }

  // #random() returns a random number between 0 (inclusive) and 1 (exclusive)

  utils.randomBoundBy = function(a,b) {
    return Math.floor(Math.random() * b) + a;
  }

  utils.percentChance = function(n) {
    return (Math.floor(Math.random() * 100) < n) ? true : false;
  }



})();
