(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var HeavyTank = window.Rumble.HeavyTank = function (args) {
    this.args = args;
    this.color = args.color;
    this.hp = 100;
    this.damage =  50;
    this.movementRange = 5;
    this.attackRange = 1;
    this.landTypeList = { "normal": true, "mountain": false };
    this.turnOver = true;
    this.model = this.addModel();
    this.boardAddUnit();
  };

  HeavyTank.prototype.addModel = function() {
    var model = game.add.sprite(this.args.x, this.args.y, 'heavyTank' + this.color);
    model.tint = 0xACACAC;

    // model.animations.add('left', [0,1], 10, true);
    // model.animations.add('right', [2,3], 10, true);
    model.inputEnabled = true;
    model.events.onInputDown.add(window.board.handleUnitClick, { context: this, contextFunction: window.board});
    return model;
  };

  HeavyTank.prototype.boardAddUnit = function() {
    window.board.addUnitInitialize(this);
  };

  HeavyTank.prototype.boardRemoveUnit = function() {
    window.board.removeUnit(this);
  };

  HeavyTank.prototype.startTurn = function() {
    this.turnOver = false;
    this.model.tint = 0xFFFFFF;
  };

  HeavyTank.prototype.endTurn = function() {
    this.turnOver = true;
    this.model.tint = 0xACACAC;
  };


})();
