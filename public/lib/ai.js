(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var AI = window.Rumble.AI = function (team, enemyTeam) {
    this.team = team;
    this.enemyTeam = enemyTeam;
    this.closestEnemiesSearchRadius = 2;
    this.playing = false;
  };

  AI.prototype.play = function() {
    this.playing = true;
    console.log("AI: It's my turn...");
    window.utils.shuffleArray(this.team.units);

    this.findUnitToTakeTurn();
  };

  AI.prototype.findUnitToTakeTurn = function() {
    if (!this.playing) {
      return;
    }

    window.battle.deselectAllUnits();
    for (var i = 0; i < this.team.units.length; i++) {
      if (this.team.units[i].isTurnOver() == false) {
        return this.takeUnitTurn(this.team.units[i]);
      } else {
        this.team.units[i].endTurn();
      }
    }
    this.playing = false;
    console.log('AI: all done, ending my turn.');
    window.battle.checkNextTurn();
  };

  AI.prototype.takeUnitTurn = function(unit) {
    window.board.resetGridBackground();
    console.log("AI: I am taking turn for my " + unit.name);
    unit.select(1);

    var enemiesInRange = unit.allEnemiesInRange();
    if (unit.attacked) {
      unit.endTurn();
      return this.findUnitToTakeTurn();
    } else if (unit.moved && !enemiesInRange) {
      unit.endTurn();
      return this.findUnitToTakeTurn();
    } else if (unit.moved && enemiesInRange) {
      return this.attackInRangeEnemy(unit);
    } else if (!unit.moved && !enemiesInRange) {
      return this.moveToClosestEnemy(unit);
    } else if (!unit.moved && enemiesInRange) {
      return this.attackInRangeEnemy(unit);
    }
  };

  // ################## ATTACKING ######################
  AI.prototype.attackInRangeEnemy = function(unit) {
    // find all enemies in range, and pick the best one to attack based on armor type
    var enemies = window.utils.shuffleArray(unit.enemiesInRange());
    var targetEnemy = unit.bestTargetFromArr(enemies);
    unit.attack(targetEnemy);
  };

  // ################## MOVING ######################
  AI.prototype.moveToClosestEnemy = function(unit) {
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
      unit.moved = true;
      return this.findUnitToTakeTurn();
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

    var targetEnemy = bestChoiceEnemies[0];
    console.log("    moving towards a " + targetEnemy.unit.nameColor + " that is close and would take the most damage from me.");
    window.board.showOverlaySelectedAt(targetEnemy.unit.currentCoor(), "2");

    // choose a spot from target enemy's short path to move to
    var movementCoors = unit.movementCoors(), path = targetEnemy.path.slice(1, - 1), moveToCoor;
    for (var i = 0; i < path.length; i++) {
      if (movementCoors[path[i]] && !window.board.occupiedAt(path[i])) {
        moveToCoor = path[i];
      }
    }

    if (!moveToCoor) {
      unit.moved = true;
      return this.findUnitToTakeTurn();
    }
    window.board.showPathFinderShade(movementCoors, targetEnemy.unit);
    // window.board.showShortestPathShade(targetEnemy.path);
    window.board.moveUnitTo(unit, moveToCoor[0], moveToCoor[1]);
  };
})();
