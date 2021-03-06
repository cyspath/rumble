(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var Battle = window.Rumble.Battle = function () {
    this.turn = 1;
    // this.team1 = {};
    // this.team2 = {};
    // this.colors = ["Red", "Yellow"]; // staring, turn 1, team's color is 'Blue'
  };

  Battle.prototype.start = function(team1, team2) {
    this.allUnits = team1.units.concat(team2.units);
    this.turn = 1;
    this.colors = [team2.color, team1.color]
    this.team1 = team1;
    this.team2 = team2;
    this.resetTeamTurns(this.team1);
    this.logTurn();
  };

  Battle.prototype.resetTeamTurns = function(team) {
    for (var i = 0; i < team.units.length; i++) {
      team.units[i].startTurn();
    }
  };

  Battle.prototype.endTeamTurns = function(team) {
    for (var i = 0; i < team.units.length; i++) {
      team.units[i].endTurn();
    }
  };

  Battle.prototype.checkNextTurn = function() {
    var winner = this.winCondition();
    if (winner) {
      this.displayGameOverMessage(winner);
    } else if (this.teamTurnOver(this.currentTeam())) {
      // if current team all units have made their moves, proceed to next turn
      this.nextTurn();
    } else if (window.AI.playing) {
      window.AI.findUnitToTakeTurn();
    }
  };

  Battle.prototype.nextTurn = function() {
    this.endTeamTurns(this.currentTeam());
    this.deselectAllUnits();
    this.turn ++;
    this.logTurn();
    this.resetTeamTurns(this.currentTeam());
    window.board.resetGridBackground(); // reset background
    window.AI.playing = false;
    if (this.turn % 2 == 0) {
      window.AI.play();
    }
  };

  Battle.prototype.winCondition = function() {
    if (this.team1.units.length === 0) {
      return 2;
    } else if (this.team2.units.length === 0) {
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
    for (var i = 0; i < team.units.length; i++) {
      if (!team.units[i].isTurnOver()) {
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
    var idx = team.units.indexOf(unit);
    if (idx > -1) {
      team.units.splice(idx, 1);
    }
  };

  Battle.prototype.deselectAllUnits = function () {
    this.allUnits.forEach(function (u) {
      u.deselect();
    })
  };

  // CONTROL PANEL
  Battle.prototype.addControlPanel = function () {
    var that = this;
    game.add.sprite(0, 640, 'panelBackground');

    var button_end_turn = game.add.button(442, 650, 'button_end_turn', actionOnClickEndTurn, that, 1, 0, 1, 0); // over, out, down
    button_end_turn.scale.setTo(0.5, 0.5); // make button 1/2 size
    function actionOnClickEndTurn() {
      this.nextTurn();
    }

    var button_refresh = game.add.button(575, 705, 'button_refresh', actionOnClickRefresh, that, 1, 0, 1, 0); // over, out, down
    function actionOnClickRefresh() {
      if (confirm("Are you sure you want to reload the game?")) {
        window.location.reload();
      }
    }
  };

  Battle.prototype.logTurn = function () {
    console.log("");
    console.log("################# Turn " + this.turn + " #################");
    console.log("");

  };

})();
