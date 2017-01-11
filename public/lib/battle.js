(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var Battle = window.Rumble.Battle = function () {
    this.turn = 1;
    this.team1 = [];
    this.team2 = [];
    this.colors = ["Red", "Yellow"]; // staring, turn 1, team's color is 'Blue'
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

  Battle.prototype.endTeamTurns = function(team) {
    for (var i = 0; i < team.length; i++) {
      team[i].endTurn();
    }
  };

  Battle.prototype.checkNextTurn = function() {
    var winner = this.winCondition();
    if (winner) {
      this.displayGameOverMessage(winner);
    } else if (this.teamTurnOver(this.currentTeam())) {
      // if current team all units have made their moves, proceed to next turn
      this.nextTurn();
    }
  };

  Battle.prototype.nextTurn = function() {
    this.endTeamTurns(this.currentTeam());
    this.turn ++;
    console.log("Turn " + this.turn);
    this.resetTeamTurns(this.currentTeam());
    window.board.resetGridBackground(); // reset background
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

  Battle.prototype.displayGameOverMessage = function(winner) {
    var bar = game.add.graphics();
    bar.beginFill(0x000000, 0.4);
    bar.drawRect(0, 100, 800, 100);

    var message = game.add.bitmapText(0, 140, 'carrier_command', "PLAYER " + winner + " WON!", 20);
    message.align = 'center';
    message.x = (window.game.width / 2) - (message.textWidth / 2);
  };


  Battle.prototype.currentTeam = function() {
    var n = this.turn % 2 === 0 ? 2 : 1;
    return this["team" + n];
  };

  Battle.prototype.currentTeamColor = function() {
    return this.colors[this.turn % 2];
  };

  Battle.prototype.unitTeam = function(unit) {
    return unit.color === this.colors[1] ? this.team1 : this.team2;
  };

  Battle.prototype.isCurrentTurnUnit = function(unit) {
    return this.currentTeamColor() === unit.color;
  };

  Battle.prototype.teamTurnOver = function(team) {
    for (var i = 0; i < team.length; i++) {
      if (!team[i].isTurnOver()) {
        return false;
      }
    }
    return true;
  };

  Battle.prototype.resolveDamage = function(initiator, retaliator) {
    var actualDamage = initiator.currentDamage() * (window.Rumble.DamageVsArmor[initiator.damageType + '-' + retaliator.armorType]);
    retaliator.hp = Math.floor(Math.max(retaliator.hp - actualDamage, 0));
    retaliator.updateHpBar();
    console.log(initiator.color + initiator.type + " did damage: " + actualDamage);
  };

  Battle.prototype.deleteUnit = function(unit) {
    var team = this.unitTeam(unit);
    var idx = team.indexOf(unit);
    if (idx > -1) {
      team.splice(idx, 1);
    }
  };

  // CONTROL PANEL
  Battle.prototype.addControlPanel = function () {
    var that = this;
    var button = game.add.button(0, 640, 'button_end_turn', actionOnClick, that, 1, 0, 1, 0); // over, out, down
    button.scale.setTo(0.5, 0.5); // make button 1/2 size
    function actionOnClick() {
      this.nextTurn();
    }
  };

})();
