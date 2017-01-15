(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var land = window.Rumble.Terrain;

  var Board = window.Rumble.Board = function () {
    this.grid = this.buildGrid(10, 10);
    this.addGrassland();
    this.addForests();
    this.addRocks();
    this.overlay = this.buildOverlay(10, 10);
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
      window.Rumble.SelectedUnit.attack(unit);
      this.contextFunction.resetGridBackground();
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
    window.battle.deselectAllUnits();

    // move or attack
    if (!unit.moved || !window.battle.isCurrentTurnUnit(unit)) {
      this.showPathFinder(unit);
      unit.select(1);
    }

    if (!unit.attacked || !window.battle.isCurrentTurnUnit(unit)) {
      this.showRangeFinder(unit);
      unit.select(1);
    }

    if (unit.isTurnOver()) {
      unit.select(2);
    }

  };

  Board.prototype.selectedUnitIsAttacked = function() {

  };

  Board.prototype.showPathFinder = function(unit) {
    var pathFinder = utils.movementCoors(this.grid, unit);
    window.Rumble.PathFinder = pathFinder;
    this.showPathFinderShade(pathFinder, unit);
  };

  Board.prototype.showRangeFinder = function(unit) {
    var atkRangeCoors = unit.atkRangeCoors();
    window.Rumble.AtkRangeCoors = atkRangeCoors;
    this.showRangeFinderOverlay(atkRangeCoors);
  };

  Board.prototype.handleTileClick = function() {
    this.contextFunction.resetGridBackground();

    if (window.animations || window.Rumble.SelectedUnit === undefined || (window.Rumble.SelectedUnit && window.Rumble.SelectedUnit.moved)) {
      return this.contextFunction.resetUnitPathRange();;
    };

    var i = this.context.position.y / 64, j = this.context.position.x / 64;
    if (window.Rumble.PathFinder[[i, j]]) {
      this.contextFunction.moveUnitTo(window.Rumble.SelectedUnit, i, j);
    } else {
      window.Rumble.SelectedUnit.deselect();
    }
  };

  Board.prototype.moveUnitTo = function(unit, i, j) {
    window.animations = true;
    this.removeUnit(unit);
    var pathObj = unit.movementCoors()[[i, j]];
    var moves = pathObj.path.length;
    var moveTime = 300;
    var tweenPath = window.utils.splitPathArray(pathObj.path);
    unit.animateFrames(moveTime, moves, tweenPath.x);
    var tween = game.add.tween(unit.model);
    tween.to({ x: tweenPath.x, y: tweenPath.y }, (moveTime * moves), "Linear", this.cb);
    tween.start();
    tween.onComplete.add(this.afterMoveUnit, { unit: unit, contextFunction: this })
  };

  Board.prototype.afterMoveUnit = function() {
    this.unit.model.animations.stop();
    window.animations = false; // let global know animation is now complete as well

    this.contextFunction.addUnit(this.unit); // update grid's reference of unit
    this.contextFunction.resetPathFinder(); // reset pathfinder global variable

    this.unit.moved = true;

    if (this.unit.isTurnOver()) {
      this.contextFunction.endUnitTurn(this.unit);
    } else if (!this.unit.attacked) {
      this.contextFunction.showRangeFinder(this.unit);
      this.unit.select(1);
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
    if (window.Rumble.SelectedUnit) {
      window.Rumble.SelectedUnit.deselect();
      window.Rumble.SelectedUnit = undefined;
    }
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

  Board.prototype.hasEnemyUnit = function(unit, i, j) {
    return this.grid[i][j].unit !== undefined && this.grid[i][j].unit.color != unit.color;
  };

  Board.prototype.occupiedAt = function(coor) {
    return this.grid[coor[0]][coor[1]].unit !== undefined;
  };

  Board.prototype.occupiedOrReduceMovementAt = function(coor, unit) {
    if (this.occupiedAt(coor)) {
      return true;
    } else if (window.Rumble.TerrainMovementReduction[unit.movementType + "-" + window.board.grid[coor[0]][coor[1]].land.type].slice(0, 6) == "REDUCE") {
      return true;
    }
    return false;
  };

  ////////////////////////// SET UP THE GRID //////////////////////////

  Board.prototype.buildGrid = function(height, width) {
    var m = new Array(height);
    for (var i = 0; i < height; i++) {
      m[i] = new Array(width);
      for (var j = 0; j < m[i].length; j++) {
        m[i][j] = { pos: [i, j], tile: undefined, land: undefined, unit: undefined };
      }
    }
    return m;
  };

  Board.prototype.buildOverlay = function(height, width) {
    var m = new Array(height);
    for (var i = 0; i < height; i++) {
      m[i] = new Array(width);
      for (var j = 0; j < m[i].length; j++) {
        m[i][j] = { pos: [i, j], tile: undefined, overlayFrame: land.overlayFrame, capture: undefined };
      }
    }
    return m;
  };

  Board.prototype.addGrassland = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].land = land.grassland;
      }
    }
  };

  Board.prototype.addForests = function() {
    var a = [[0,0],[0,1],[0,2],[0,7],[0,8],[1,0],[1,1],[2,0],[1,4],[2,4],[2,3],[9,2],[9,3],[8,3],[8,4],[7,5],[9,5],[8,8],[7,9],[3,7],[4,7],[4,8],[4,9],[5,8],[5,9]]
    var that = this;
    a.forEach(function(coor) {
        that.grid[coor[0]][coor[1]].land = [land.grasslandForest1, land.grasslandForest2, land.grasslandForest3, land.grasslandBushes1, land.grasslandBushes2][utils.randomBoundBy(0, 5)];
    })
  };

  Board.prototype.addRocks = function() {
    var a = [[0,5],[0,6],[1,6],[3,2],[3,3],[4,1],[4,2],[5,1],[6,0],[6,4],[7,4],[8,5],[9,4],[9,7],[9,8],[9,9],[8,9]]
    var that = this;
    a.forEach(function(coor) {
        that.grid[coor[0]][coor[1]].land = land.grasslandRock;
    })
  };

  Board.prototype.addExplosions = function() {
    this.explosions = [game.add.sprite(0, 0, "explosion1"), game.add.sprite(0, 0, "explosion2")]
    this.explosions.forEach(function(e) {
      e.visible = false;
      var anim = e.animations.add('explode', [ 23, 24,  23, 24, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 40, false);
      anim.onComplete.add(function() {
        e.visible = false;
      }, e);
    })
  };

  Board.prototype.explode = function (x,y) {
    var explosion = this.explosions[window.utils.randomBoundBy(0,2)];
    explosion.x = x;
    explosion.y = y;
    explosion.visible = true;
    explosion.play('explode');
  };

  Board.prototype.resetGridBackground = function () {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].tile.tint = 0xFFFFFF;
        this.grid[i][j].tile.frame = this.grid[i][j].land.default;
        this.overlay[i][j].tile.frame = this.overlay[i][j].overlayFrame.default;
      }
    }
  };

  Board.prototype.showPathFinderShade = function (coors, unit) {
    for (var coor in coors) {
      coor = coor.split(",")
      if (unit.moved) { // show darker tint
        grid[coor[0]][coor[1]].tile.tint = 0xCCCCCC;
      } else {  // show ligher frame
        grid[coor[0]][coor[1]].tile.frame = grid[coor[0]][coor[1]].land.pathFinderShade;
      }
    }
  };

  Board.prototype.showRangeFinderOverlay = function (coors) {
    coors.forEach(function(coor) {
      this.overlay[coor[0]][coor[1]].tile.frame = this.overlay[coor[0]][coor[1]].overlayFrame.sight;
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

  Board.prototype.createForeground = function() {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        tile = window.game.add.sprite(j * 64, i * 64, 'tiles');
        tile.frame = this.overlay[i][j].overlayFrame.default;
        tile.alpha = 0;
        window.game.add.tween(tile).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 1000, true);
        this.overlay[i][j].tile = tile;
      }
    }
  };

  Board.prototype.showOverlaySelectedAt = function (coor, n) {
    this.grid[coor[0]][coor[1]].unit.select(n);
  };

})();
