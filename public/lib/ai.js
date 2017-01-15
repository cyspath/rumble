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
    this.moveToClosestEnemy(unit);

    // var that = this;
    // setTimeout(function () {
    //   console.log('taking turn for ' + unit.name);
    //   unit.endTurn();
    //   that.takeUnitsTurns();
    // }, 1000)
  };

  AI.prototype.moveToClosestEnemy = function(unit) {
    console.log("AI: I am taking turn for my " + unit.name);
    this.moveToClosestEnemy(unit);

    // var that = this;
    // setTimeout(function () {
    //   console.log('taking turn for ' + unit.name);
    //   unit.endTurn();
    //   that.takeUnitsTurns();
    // }, 1000)
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
