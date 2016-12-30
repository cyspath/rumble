(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var LightSoldier = window.Rumble.LightSoldier = function (args) {
    this.type = "lightSoldier";
    this.hp = 20;
    this.damage =  10;
    this.movementRange = 3;
    this.landTypeList = { "normal": true, "forest": false, "rock": true };

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(LightSoldier, window.Rumble.UnitClass);


})();
