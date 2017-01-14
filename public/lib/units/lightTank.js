(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var LightTank = window.Rumble.LightTank = function (args) {
    this.type = "lightTank";
    this.maxHp = 70;
    this.maxDamage = 35;
    this.movementRange = 6;
    this.armorType = "medium";
    this.damageType = "medium";
    this.hp = this.maxHp;
    this.movementType = "track";

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(LightTank, window.Rumble.UnitClass);


})();
