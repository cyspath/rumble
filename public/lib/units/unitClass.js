(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var UnitClass = window.Rumble.UnitClass = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.color = args.color;
    this.attackRange = 1;
    this.moved = true;
    this.attacked = true;
    this.model = this.addModel();
    this.boardAddUnit();
  };

  UnitClass.prototype.addModel = function() {
    var model = game.add.sprite(this.x, this.y, this.type + this.color);
    model.tint = 0xACACAC;

    // model.animations.add('left', [0,1], 10, true);
    // model.animations.add('right', [2,3], 10, true);
    model.inputEnabled = true;
    model.events.onInputDown.add(window.board.handleUnitClick, { context: this, contextFunction: window.board});
    return model;
  };

  UnitClass.prototype.boardAddUnit = function() {
    window.board.addUnit(this);
  };

  UnitClass.prototype.boardRemoveUnit = function() {
    window.board.removeUnit(this);
  };

  UnitClass.prototype.isTurnOver = function() {
    if (this.attacked) {
      return true;
    } else if (this.moved && !this.isEnemyInRange()) {
      return true;
    } else {
      return false;
    }
  };

  UnitClass.prototype.startTurn = function() {
    this.moved = false;
    this.attacked = false;
    this.model.tint = 0xFFFFFF;
  };

  UnitClass.prototype.endTurn = function() {
    this.moved = true;
    this.attacked = true;
    this.model.tint = 0xACACAC;
  };

  UnitClass.prototype.isEnemyInRange = function() {
    var coors = [];
    var that = this;
    this.atkRangeCoors().forEach(function(coor) {
      var tileUnit = window.board.grid[coor[0]][coor[1]].unit;
      if (tileUnit && tileUnit.color !== that.color) {
        coors.push(coor);
      }
    })
    return coors.length === 0 ? false : coors;
  };

  UnitClass.prototype.enemiesInRange = function() { // array of enemies, if none - empty array
    var coors = this.isEnemyInRange();
    if (coors) {
      return coors.map(function(coor) {
        return window.board.grid[coor[0]][coor[1]].unit;
      })
    } else {
      return [];
    }
  };

  UnitClass.prototype.atkRangeCoors = function() {
    // this function will get complicated with longer range
    var coor = this.currentGridCoor();
    return [[coor.i - 1, coor.j], [coor.i, coor.j + 1], [coor.i + 1, coor.j], [coor.i, coor.j - 1]].filter(function (a) {
      if (window.board.grid[a[0]] && window.board.grid[a[0]][a[1]]) {
        return a;
      }
    })
  };

  UnitClass.prototype.currentGridCoor = function() {
    return { "i": this.model.position.y/64, "j": this.model.position.x/64 };
  };


})();
