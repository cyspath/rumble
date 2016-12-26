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
        this.grid[i][j].tile.frame = this.grid[i][j].land.background;;
      }
    }
  };

  Board.prototype.showMovementForeground = function (coors) {
    for (var coor in coors) {
      coor = coor.split(",")
      grid[coor[0]][coor[1]].tile.frame = grid[coor[0]][coor[1]].land.foreground;
    }
  };


  Board.prototype.createBackground = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        tile = window.game.add.sprite(j * 64, i * 64, 'tiles');

        tile.frame = this.grid[i][j].land.background;

        tile.inputEnabled = true;
        tile.events.onInputDown.add(this.handleTileClick, { context: tile, contextFunction: this });

        this.grid[i][j].tile = tile;
      }
    }
  }

  Board.prototype.handleTileClick = function() {
    if (window.animations) { return; };
    if (window.Rumble.SelectedUnit !== undefined) {
      this.contextFunction.resetGridBackground();

      var i = this.context.position.y / 64, j = this.context.position.x / 64;
      if (window.Rumble.PathFinder[[i, j]]) {
        this.contextFunction.moveUnitTo(this.context, i, j);
      }
      this.contextFunction.resetCurrentSelection();
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
    tween.onComplete.add(this.addUnit, { unit: unit, contextFunction: this })
  };

  Board.prototype.resetCurrentSelection = function() {
    window.Rumble.SelectedUnit = undefined;
    window.Rumble.PathFinder = undefined;
  };

  Board.prototype.handleUnitClick = function() {
    if (window.animations) { return; };
    var model = this.context.model;
    if (window.Rumble.SelectedUnit !== this.context) {
      var pathFinder = utils.movementCoors(grid, this.context);
      this.contextFunction.resetGridBackground();
      this.contextFunction.showMovementForeground(pathFinder);
      this.contextFunction.updateCurrentSelection(this.context, pathFinder);
    }
  };

  Board.prototype.updateCurrentSelection = function(unit, pathFinder) {
    window.Rumble.SelectedUnit = unit;
    window.Rumble.PathFinder = pathFinder;
  };

  Board.prototype.convertXYToCoor = function(x, y) {
    return { "i": y/64, "j": x/64 }
  };

  Board.prototype.addUnit = function(unit) {
    if (this.contextFunction) {
      var coor = this.contextFunction.convertXYToCoor(this.unit.model.position.x, this.unit.model.position.y);
      this.contextFunction.grid[coor.i][coor.j].unit = this.unit;
    } else {
      var coor = this.convertXYToCoor(unit.model.position.x, unit.model.position.y);
      this.grid[coor.i][coor.j].unit = unit;
    }
    window.animations = false;
  };

  Board.prototype.removeUnit = function(unit) {
    var coor = this.convertXYToCoor(unit.model.position.x, unit.model.position.y);
    this.grid[coor.i][coor.j].unit = undefined;
  };

  Board.prototype.hasUnit = function(i, j) {
    return this.grid[i][j].unit !== undefined;
  };

})();
