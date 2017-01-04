(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var LightSoldier = window.Rumble.LightSoldier = function (args) {
    this.type = "lightSoldier";
    this.maxHp = 20;
    this.hp = this.maxHp;
    this.maxDamage = 10;
    this.movementRange = 3;
    this.landTypeList = { "normal": true, "forest": true, "rock": true };

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(LightSoldier, window.Rumble.UnitClass);


})();
