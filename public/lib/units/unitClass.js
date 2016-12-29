(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var UnitClass = window.Rumble.UnitClass = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.color = args.color;
    this.turnOver = true;
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
    window.board.addUnitInitialize(this);
  };

  UnitClass.prototype.boardRemoveUnit = function() {
    window.board.removeUnit(this);
  };

  UnitClass.prototype.startTurn = function() {
    this.turnOver = false;
    this.model.tint = 0xFFFFFF;
  };

  UnitClass.prototype.endTurn = function() {
    this.turnOver = true;
    this.model.tint = 0xACACAC;
  };

})();
