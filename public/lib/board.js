(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var land = window.Rumble.land;

  var Board = window.Rumble.Board = function () {
    this.grid = this.build();
    this.addDesert();
    this.addMountains();
  };

  Board.prototype.handleUnitClick = function() {
    var unit = this.context;
    if (window.animations) {
      return;
    };

    if (window.Rumble.SelectedUnit === undefined || window.Rumble.SelectedUnit === unit) {
      return this.contextFunction.selectUnit(unit);
    }

    var attackedUnits = window.Rumble.SelectedUnit.enemiesInRange();
    if (!window.Rumble.SelectedUnit.attacked && attackedUnits.indexOf(unit) !== -1) {
      // if clicked unit is being attacked...
      debugger
      window.Rumble.SelectedUnit.attacked = true;
      if (window.Rumble.SelectedUnit.isTurnOver()) {
        this.contextFunction.endUnitTurn(window.Rumble.SelectedUnit);
      }
    } else {
      // if clicked unit is being selected

      return this.contextFunction.selectUnit(unit);
    }
  };

  Board.prototype.selectUnit = function(unit) {
    window.Rumble.SelectedUnit = unit;
    this.resetGridBackground();

    // move or attack
    if (!unit.moved || !window.battle.isCurrentTurnUnit(unit)) {
      this.showPathFinder(unit);
    }

    if (!unit.attacked || !window.battle.isCurrentTurnUnit(unit)) {
      this.showRangeFinder(unit);
    }

  };

  Board.prototype.selectedUnitIsAttacked = function() {

  };

  Board.prototype.showPathFinder = function(unit) {
    var pathFinder = utils.movementCoors(this.grid, unit);
    window.Rumble.PathFinder = pathFinder;
    this.showPathFinderShade(pathFinder);
  };

  Board.prototype.showRangeFinder = function(unit) {
    var atkRangeCoors = unit.atkRangeCoors();
    window.Rumble.AtkRangeCoors = atkRangeCoors;
    this.showRangeFinderShade(atkRangeCoors);
  };

  Board.prototype.handleTileClick = function() {
    this.contextFunction.resetGridBackground();

    if (window.animations || window.Rumble.SelectedUnit === undefined || (window.Rumble.SelectedUnit && window.Rumble.SelectedUnit.moved)) {
      return this.contextFunction.resetUnitPathRange();;
    };

    var i = this.context.position.y / 64, j = this.context.position.x / 64;
    if (window.Rumble.PathFinder[[i, j]]) {
      this.contextFunction.moveUnitTo(this.context, i, j);
    }
  };

  Board.prototype.moveUnitTo = function(tile, i, j) {
    window.animations = true;
    var unit = window.Rumble.SelectedUnit
    this.removeUnit(unit);
    var pathObj = window.Rumble.PathFinder[[i, j]];
    var time = (unit.movementRange - pathObj.stepsLeft) * 300;
    var tweenPath = window.utils.splitPathArray(pathObj.path);
    var tween = game.add.tween(unit.model);
    tween.to({ x: tweenPath.x, y: tweenPath.y }, time, "Linear");
    tween.start();
    tween.onComplete.add(this.afterMoveUnit, { unit: unit, contextFunction: this })
  };

  Board.prototype.afterMoveUnit = function() {
    window.animations = false; // let global know animation is now complete as well

    this.contextFunction.addUnit(this.unit); // update grid's reference of unit
    this.contextFunction.resetPathFinder(); // reset pathfinder global variable

    this.unit.moved = true;

    if (this.unit.isTurnOver()) {
      this.contextFunction.endUnitTurn(this.unit);
    } else if (!this.unit.attacked) {
      this.contextFunction.showRangeFinder(this.unit);
      // and can still attack
    }
  };

  Board.prototype.endUnitTurn = function(unit) {
    unit.endTurn(); // end current unit's turn
    this.resetSelectedUnit();
    this.resetPathFinder();
    this.resetAtkRangeCoors();
    window.battle.checkNextTurn(); // check whether win, take next turn, or doing nothing (keep going current turn)
  };

  Board.prototype.resetSelectedUnit = function() {
    window.Rumble.SelectedUnit = undefined;
  };

  Board.prototype.resetPathFinder = function() {
    window.Rumble.PathFinder = undefined;
  };

  Board.prototype.resetAtkRangeCoors = function() {
    window.Rumble.AtkRangeCoors = undefined;
  };

  Board.prototype.resetUnitPathRange = function() {
    this.resetSelectedUnit();
    this.resetPathFinder();
    this.resetAtkRangeCoors();
  };

  Board.prototype.convertXYToCoor = function(x, y) {
    return { "i": y/64, "j": x/64 }
  };

  Board.prototype.addUnit = function(unit) {
    var coor = this.convertXYToCoor(unit.model.position.x, unit.model.position.y);
    this.grid[coor.i][coor.j].unit = unit; // add a reference to unit for grid
  };

  Board.prototype.removeUnit = function(unit) {
    var coor = this.convertXYToCoor(unit.model.position.x, unit.model.position.y);
    this.grid[coor.i][coor.j].unit = undefined;
  };

  Board.prototype.hasUnit = function(i, j) {
    return this.grid[i][j].unit !== undefined;
  };

  ////////////////////////// SET UP THE GRID //////////////////////////

  Board.prototype.build = function() {
    return this.generateGrid(10, 10);
  };

  Board.prototype.generateGrid = function(width, height) {
    var m = new Array(height);
    for (var i = 0; i < height; i++) {
      m[i] = new Array(width);
      for (var j = 0; j < m[i].length; j++) {
        m[i][j] = { pos: [i, j], land: undefined, tile: undefined, unit: undefined };
      }
    }
    return m;
  };

  Board.prototype.addDesert = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].land = land.desert;
      }
    }
  };

  Board.prototype.addMountains = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        if (utils.percentChance(10)) {
          this.grid[i][j].land = [land.desertMountain1, land.desertMountain2, land.desertMountain3][utils.randomBoundBy(0, 2)];
        }
      }
    }
  };

  Board.prototype.resetGridBackground = function () {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].tile.frame = this.grid[i][j].land.default;;
      }
    }
  };

  Board.prototype.showPathFinderShade = function (coors) {
    for (var coor in coors) {
      coor = coor.split(",")
      grid[coor[0]][coor[1]].tile.frame = grid[coor[0]][coor[1]].land.pathFinderShade;
    }
  };

  Board.prototype.showRangeFinderShade = function (coors) {
    coors.forEach(function(coor) {
      grid[coor[0]][coor[1]].tile.frame = grid[coor[0]][coor[1]].land.rangeFinderShade;
    })
  };


  Board.prototype.createBackground = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        tile = window.game.add.sprite(j * 64, i * 64, 'tiles');

        tile.frame = this.grid[i][j].land.default;

        tile.inputEnabled = true;
        tile.events.onInputDown.add(this.handleTileClick, { context: tile, contextFunction: this });

        this.grid[i][j].tile = tile;
      }
    }
  };

})();
