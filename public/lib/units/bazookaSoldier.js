(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var BazookaSoldier = window.Rumble.BazookaSoldier = function (args) {
    this.type = "bazookaSoldier";
    this.maxHp = 50;
    this.maxDamage = 30;
    this.movementRange = 3;
    this.armorType = "light";
    this.damageType = "heavy";
    this.hp = this.maxHp;
    this.movementType = "foot";

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(BazookaSoldier, window.Rumble.UnitClass);


})();
