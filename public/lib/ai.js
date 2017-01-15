(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var AI = window.Rumble.AI = function (team, enemyTeam) {
    this.team = team;
    this.enemyTeam = enemyTeam;
    this.closestEnemiesSearchRadius = 2;
  };

  AI.prototype.play = function() {
    console.log("");
    console.log("AI: It's my turn...");
    window.utils.shuffleArray(this.team.units);
    this.takeUnitsTurns();
  };

  AI.prototype.takeUnitsTurns = function() {
    this.findUnitToTakeTurn();
  };

  AI.prototype.findUnitToTakeTurn = function() {
    for (var i = 0; i < this.team.units.length; i++) {
      if (this.team.units[i].isTurnOver() == false) {
        // take turn for this unit
        return this.takeUnitTurn(this.team.units[i]);
      }
    }
    return window.battle.nextTurn();
  };

  AI.prototype.takeUnitTurn = function(unit) {
    console.log("AI: I am taking turn for my " + unit.name);
    window.board.showOverlaySelectedAt(unit.currentCoor(), "1");
    this.moveToClosestEnemy(unit);

    // var that = this;
    // setTimeout(function () {
    //   console.log('taking turn for ' + unit.name);
    //   unit.endTurn();
    //   that.takeUnitsTurns();
    // }, 1000)
  };

  AI.prototype.moveToClosestEnemy = function(unit) {
    if (unit.moved) {
      return unit.endTurn();
    }
    // array of path objects ranked by A* pathfind distance
    var rankedDistanceObjs = this.enemyTeam.units.map(function (u) {
      return {
        path: utils.pathfinder(unit.currentCoor(), u.currentCoor(), window.board.grid, unit),
        unit: u
      }
    }).filter(function (u) {
      if (u.path) {
        return u;
      }
    }).sort(window.utils.sortCompareDistance);

    // end unit's turn if it cannot find a target path at all
    if (rankedDistanceObjs.length === 0) {
      return unit.endTurn();
    }

    // find closest enemies (within path length deviation of +/- 2)
    var closestEnemies = [rankedDistanceObjs[0]];
    for (var i = 1; i < rankedDistanceObjs.length; i++) {
      if (Math.abs(rankedDistanceObjs[i].path.length - rankedDistanceObjs[0].path.length) <= this.closestEnemiesSearchRadius) {
        closestEnemies.push(rankedDistanceObjs[i])
      }
    }

    // choice one from closest enemies to try to attack based on attacker damage and defender armor
    var favorableEnemyArmorTypes = unit.bestVsArmorTypes();
    var bestChoiceEnemies = closestEnemies.filter(function (enemy) {
      if (favorableEnemyArmorTypes.indexOf(enemy.unit.armorType) != -1) {
        return enemy;
      }
    });
    if (bestChoiceEnemies.length === 0) {
      bestChoiceEnemies = closestEnemies;
    }
    console.log(bestChoiceEnemies);

    var targetEnemy = bestChoiceEnemies[0];
    console.log("AI: moving towards a " + targetEnemy.unit.nameColor + " that is close and would take the most damage from me.");
    window.board.showOverlaySelectedAt(targetEnemy.unit.currentCoor(), "2");

    // choose a spot from target enemy's short path to move to
    var movementCoors = unit.movementCoors(), path = targetEnemy.path.slice(1, - 1), moveToCoor;
    for (var i = 0; i < path.length; i++) {
      if (movementCoors[path[i]] && !window.board.occupiedAt(path[i])) {
        moveToCoor = path[i];
      }
    }

    if (!moveToCoor) {
      return unit.endTurn();
    }
    window.board.showPathFinderShade(movementCoors, targetEnemy.unit);
    window.board.moveUnitTo(unit, moveToCoor[0], moveToCoor[1]);
  };


  // AI.prototype.enemyDistanceObjs = function(unit) {
  //   var distanceObjs = this.enemyTeam.units.map(function (u) {
  //     return {
  //       distance: utils.distanceBetween(unit.currentCoor(), u.currentCoor()),
  //       unit: u
  //     }
  //   })
  //   return distanceObjs; //  [{ distance: 6, unit: window.Rumble.LightTank }, ... ]
  // };
  //
  // AI.prototype.rankClosestEnemies = function(unit) {
  //   var rankedClosestEnemies = this.enemyDistanceObjs(unit).sort(window.utils.sortCompareDistance);
  //   return rankedClosestEnemies; //  [{ distance: 6, unit: window.Rumble.LightTank }, ... ]
  // };
  //
  // AI.prototype.closestEnemies = function(unit) {
  //   // returns only a few enemies, who are closest with distance
  //   var rankedClosestEnemies = this.rankClosestEnemies(unit);
  //   var closestEnemy = rankedClosestEnemies[0];
  //   var closestEnemies = [closestEnemy];
  //   for (var i = 1; i < rankedClosestEnemies.length; i++) {
  //     if (Math.abs(rankedClosestEnemies[i].distance - closestEnemy.distance) <= this.closestEnemiesSearchRadius) {
  //       closestEnemies.push(rankedClosestEnemies[i])
  //     }
  //   }
  //   // now choose the closestEnemies with best damage to armor outcome
  //   var favorableEnemyArmorTypes = unit.bestVsArmorTypes();
  //   var bestClosestEnemies = closestEnemies.filter(function (enemy) {
  //     if (favorableEnemyArmorTypes.indexOf(enemy.unit.armorType) != -1) {
  //       return enemy;
  //     }
  //   })
  //   return bestClosestEnemies.length > 0 ? bestClosestEnemies : closestEnemies;
  // };
  //
  // AI.prototype.moveToClosestEnemy = function(unit) {
  //   var bestClosestEnemies = this.closestEnemies(unit);
  //   console.log("AI: moving towards a " + bestClosestEnemies[0].unit.name + " that is close and would take the most damage from me.");
  //   var coors = unit.movementCoors(), minDistance, targetCoor, enemyGridCoor = bestClosestEnemies[0].unit.currentCoor();
  //   for (var c in coors) {
  //     var coor = window.utils.strCoorToArrCoor(c);
  //     var distance = window.utils.distanceBetween(enemyGridCoor, coor)
  //     if (minDistance === undefined || distance < minDistance) {
  //       minDistance = distance;
  //       targetCoor = coor;
  //     }
  //   }
  //   window.board.moveUnitTo(unit, targetCoor[0], targetCoor[1]);
  // };


})();
