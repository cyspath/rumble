(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var Battle = window.Rumble.Battle = function () {
    this.turn = 1;
    this.team1 = [];
    this.team2 = [];
  };

  Battle.prototype.start = function(team1, team2) {
    this.team1 = team1;
    this.team2 = team2;
    this.resetTeamTurns(this.team1);
    console.log("Turn " + this.turn + " , good luck!");
  };

  Battle.prototype.resetTeamTurns = function(team) {
    for (var i = 0; i < team.length; i++) {
      team[i].startTurn();
    }
  };

  Battle.prototype.checkNextTurn = function() {
    var winner = this.winCondition();
    if (winner) {
      // needs a way to freez the game
      return console.log("Turn: " + this.turn + ", player " + winner + " won!!!");
    } else if (this.teamTurnOver(this.currentTeam())) {
      // if current team all units have made their moves, proceed to next turn
      this.nextTurn();
    }
  };

  Battle.prototype.nextTurn = function() {
    this.turn ++;
    console.log("Turn " + this.turn);
    this.resetTeamTurns(this.currentTeam());
  };

  Battle.prototype.winCondition = function() {
    if (this.team1.length === 0) {
      return 2;
    } else if (this.team2.length === 0) {
      return 1;
    } else {
      return false;
    }
  };

  Battle.prototype.currentTeam = function() {
    var n = this.turn % 2 === 0 ? 2 : 1;
    return this["team" + n]
  };

  Battle.prototype.teamTurnOver = function(team) {
    for (var i = 0; i < team.length; i++) {
      if (!team[i].isTurnOver()) {
        return false;
      }
    }
    return true;
  };

})();
