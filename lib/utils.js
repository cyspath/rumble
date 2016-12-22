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

  utils.movementCoors = function(grid, distance, startPos) {
    var store = {};
    function recurse(si, sj, m, d) {
      if (!m[si] || !m[si][sj] || d < 0 || m[si][sj].land.type == "hill") {
        return;
      }
      if (!store[[si, sj]] || store[[si, sj]] < d) {
        store[[si, sj]] = d;
        recurse(si - 1, sj, m, d - 1);
        recurse(si, sj - 1, m, d - 1);
        recurse(si + 1, sj, m, d - 1);
        recurse(si, sj + 1, m, d - 1);
      }
    }
    recurse(startPos[0], startPos[1], grid, distance);
    return store;
  }




})();
