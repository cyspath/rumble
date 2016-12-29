(function () {
  if (typeof utils === "undefined") {
    window.utils = {};
  }

  utils.inherits = function (ChildClass, ParentClass) {
    function Surrogate() {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };
  
  // #random() returns a random number between 0 (inclusive) and 1 (exclusive)

  utils.randomBoundBy = function(a,b) {
    return Math.floor(Math.random() * b) + a;
  }

  utils.percentChance = function(n) {
    return (Math.floor(Math.random() * 100) < n) ? true : false;
  }

  utils.movementCoors = function(grid, unit) {
    var store = {};
    var startPos = window.board.convertXYToCoor(unit.model.position.x, unit.model.position.y);
    function recurse(ci, cj, m, d, path) {
      if (!m[ci] || !m[ci][cj] || d < 0 || !unit.landTypeList[m[ci][cj].land.type] || (window.board.hasUnit(ci, cj) && !utils.equalCoors(ci, cj, startPos.i, startPos.j) )) {
        return;
      }
      if (!store[[ci, cj]] || store[[ci, cj]].stepsLeft < d) {
        path.push([ci, cj]);
        store[[ci, cj]] = { stepsLeft: d, path: path.slice() };
        recurse(ci - 1, cj, m, d - 1, path.slice());
        recurse(ci, cj - 1, m, d - 1, path.slice());
        recurse(ci + 1, cj, m, d - 1, path.slice());
        recurse(ci, cj + 1, m, d - 1, path.slice());
      }
    }
    recurse(startPos.i, startPos.j, grid, unit.movementRange, []);
    return store;
  }

  utils.equalCoors = function(ai, aj, bi, bj) {
    return ai === bi && aj === bj;
  };

  utils.splitPathArray = function(arr) {
    var result = { "x": [], "y": [] };
    for (var i = 0; i < arr.length; i++) {
      result["x"].push(arr[i][1] * 64);
      result["y"].push(arr[i][0] * 64);
    }
    return result;
  };


})();
