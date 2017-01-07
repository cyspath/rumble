(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var HeavyTank = window.Rumble.HeavyTank = function (args) {
    this.type = "heavyTank";
    this.maxHp = 150;
    this.maxDamage = 70;
    this.movementRange = 5;
    this.armorType = "heavy";
    this.damageType = "heavy";
    this.hp = this.maxHp;
    this.movementType = "track";

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(HeavyTank, window.Rumble.UnitClass);


})();
