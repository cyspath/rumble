(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  var RocketVehicle = window.Rumble.RocketVehicle = function (args) {
    this.type = "rocketVehicle";
    this.maxHp = 40;
    this.maxDamage = 40;
    this.movementRange = 4;
    this.armorType = "light";
    this.damageType = "heavy";
    this.hp = this.maxHp;
    this.movementType = "wheel";

    var newArgs = {
      x: args.x,
      y: args.y,
      color: args.color
    }
    window.Rumble.UnitClass.call(this, newArgs);
  };
  window.utils.inherits(RocketVehicle, window.Rumble.UnitClass);

  RocketVehicle.prototype.atkRangeCoors = function() {
    // this function will get complicated with longer range
    var coor = this.currentGridCoor();
    var atkCoors = [
      [coor.i - 3, coor.j],
      [coor.i, coor.j + 3],
      [coor.i + 3, coor.j],
      [coor.i, coor.j - 3],
      [coor.i - 4, coor.j],
      [coor.i, coor.j + 4],
      [coor.i + 4, coor.j],
      [coor.i, coor.j - 4],
      [coor.i - 5, coor.j],
      [coor.i, coor.j + 5],
      [coor.i + 5, coor.j],
      [coor.i, coor.j - 5],
    ]
    return atkCoors.filter(function (a) {
      if (window.board.grid[a[0]] && window.board.grid[a[0]][a[1]]) {
        return a;
      }
    })
  };

})();
