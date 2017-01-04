(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var HeavyTank = window.Rumble.HeavyTank = function (args) {
    this.type = "heavyTank";
    this.maxHp = 100;
    this.hp = this.maxHp;
    this.maxDamage =  50;
    this.movementRange = 5;
    this.landTypeList = { "normal": true, "forest": false, "rock": false };

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(HeavyTank, window.Rumble.UnitClass);


})();
