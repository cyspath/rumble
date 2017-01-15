var board = new window.Rumble.Board;
var battle = new window.Rumble.Battle;
var grid = board.grid;
var overlay = board.overlay;
var AI;

var cursors;
var tank;
var tile;

var tween;


window.Rumble.SelectedUnit;
window.Rumble.PathFinder;
window.Rumble.AtkRangeCoors;


function create() {
  // create background
  board.createBackground();

  // create units
  game.physics.startSystem(Phaser.Physics.ARCADE);

  var yellowTeam = {
    color: "Yellow",
    units: [
      new window.Rumble.LightSoldier({x: 0 * 64, y: 7 * 64, color: "Yellow"}),
      new window.Rumble.LightSoldier({x: 1 * 64, y: 8 * 64, color: "Yellow"}),
      new window.Rumble.BazookaSoldier({x: 1 * 64, y: 6 * 64, color: "Yellow"}),
      new window.Rumble.BazookaSoldier({x: 2 * 64, y: 8 * 64, color: "Yellow"}),
      new window.Rumble.LightTank({x: 2 * 64, y: 6 * 64, color: "Yellow"}),
      new window.Rumble.LightTank({x: 2 * 64, y: 7 * 64, color: "Yellow"}),
      new window.Rumble.HeavyTank({ x: 1 * 64, y: 7 * 64, color: "Yellow" }),
      new window.Rumble.RocketVehicle({ x: 0 * 64, y: 8 * 64, color: "Yellow" }),
      // new window.Rumble.RocketVehicle({ x: 5 * 64, y: 5 * 64, color: "Yellow" }) // debug
    ]
  }

  var redTeam = {
    color: "Red",
    units: [
      // new window.Rumble.HeavyTank({ x: 3 * 64, y: 6 * 64, color: "Red" }), // debug use
      new window.Rumble.LightSoldier({ x: 7 * 64, y: 1 * 64, color: "Red"}),
      new window.Rumble.LightSoldier({ x: 8 * 64, y: 2 * 64, color: "Red"}),
      new window.Rumble.BazookaSoldier({ x: 8 * 64, y: 3 * 64, color: "Red"}),
      // new window.Rumble.LightTank({ x: 5 * 64, y: 5 * 64, color: "Red"}),
      new window.Rumble.HeavyTank({ x: 8 * 64, y: 1 * 64, color: "Red" }),
      new window.Rumble.HeavyTank({ x: 9 * 64, y: 3 * 64, color: "Red" }),
      new window.Rumble.RocketVehicle({ x: 9 * 64, y: 1 * 64, color: "Red" })
    ]
  }

  game.physics.arcade.enable(yellowTeam.units.concat(redTeam.units).map(function(unit) { return unit.model; }), Phaser.Physics.ARCADE);

  board.addExplosions();

  // add control panel
  battle.addControlPanel();

  // creatw foreground
  board.createForeground();

  // start battle
  battle.start(yellowTeam, redTeam);

  AI = new window.Rumble.AI(redTeam, yellowTeam);

  cursors = game.input.keyboard.createCursorKeys();

}
