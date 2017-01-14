(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var AI = window.Rumble.AI = function (team, enemyTeam) {
    this.team = team;
    this.enemyTeam = enemyTeam;
  };

  AI.prototype.play = function() {
    console.log("AI turn starts...");
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


    
    var that = this;
    setTimeout(function () {
      console.log('taking turn for ' + unit.name);
      unit.endTurn();
      that.takeUnitsTurns();
    }, 1000)
  };


})();
