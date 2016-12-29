(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var HeavyTank = window.Rumble.HeavyTank = function (args) {
    this.type = "heavyTank";
    this.hp = 100;
    this.damage =  50;
    this.movementRange = 5;
    this.landTypeList = { "normal": true, "mountain": false };

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(HeavyTank, window.Rumble.UnitClass);


})();
