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
    var startPos = unit.currentCoor();

    function recurse(ci, cj, m, steps, path) {
      if (!m[ci] || !m[ci][cj] || steps > unit.movementRange) {
        return; // return if grid has no such position, or unit taken more steps than max steps
      }

      var unitAtInitialPos = utils.equalCoors(ci, cj, startPos.i, startPos.j);
      if (window.board.hasUnit(ci, cj) && !unitAtInitialPos) {
        return; // return if at none-start position and has another blocking unit
      }

      var movementMod = window.Rumble.TerrainMovementReduction[unit.movementType + "-" + m[ci][cj].land.type];
      if (movementMod === undefined) {
        return; // if the current position's terrain type return undefined for unit movementType
      }

      steps = utils.calcStepsTaken(steps, movementMod);

      if (!store[[ci, cj]] || store[[ci, cj]].stepsTaken > steps) {
        path.push([ci, cj]);
        store[[ci, cj]] = { stepsTaken: steps, path: path.slice() };
      }

      steps ++;
      recurse(ci - 1, cj, m, steps, path.slice());
      recurse(ci, cj - 1, m, steps, path.slice());
      recurse(ci + 1, cj, m, steps, path.slice());
      recurse(ci, cj + 1, m, steps, path.slice());
    }

    recurse(startPos.i, startPos.j, grid, 0, []);
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

  utils.calcStepsTaken = function(steps, movementMod) {
    switch (movementMod) {
      case "NO CHANGE":       return steps ;
      case "REDUCED BY 1":    return steps + 1;
      case "REDUCED BY 2":    return steps + 2;
      case "REDUCED TO 1":    return 1;
      default:                return 0;
    }
  };

})();
