// var player;
// var platforms;

var board = new window.Rumble.Board;
var battle = new window.Rumble.Battle;
var grid = board.grid;
var overlay = board.overlay;

var cursors;
var tank;
var tile;

var tween;
var x = 100, y = 100, t = 4


window.Rumble.SelectedUnit;
window.Rumble.PathFinder;
window.Rumble.AtkRangeCoors;

// setInterval(function () {
//   var su = window.Rumble.SelectedUnit;
//   var txt = su ? (su.type + su.color) : su;
//   console.log(txt);
// }, 500)

function create() {
  // create background
  board.createBackground();

  // create units
  game.physics.startSystem(Phaser.Physics.ARCADE);

  var team1 = [
    new window.Rumble.LightSoldier({x: 0 * 64, y: 7 * 64, color: "Blue"}),
    new window.Rumble.LightSoldier({x: 0 * 64, y: 8 * 64, color: "Blue"}),
    new window.Rumble.LightSoldier({x: 1 * 64, y: 8 * 64, color: "Blue"}),
    new window.Rumble.HeavyTank({ x: 1 * 64, y: 7 * 64, color: "Blue" })
  ];
  var team2 = [
    new window.Rumble.HeavyTank({ x: 7 * 64, y: 1 * 64, color: "Green" }),
    new window.Rumble.HeavyTank({ x: 8 * 64, y: 2 * 64, color: "Green" })
  ];

  game.physics.arcade.enable(team1.concat(team2).map(function(unit) { return unit.model; }), Phaser.Physics.ARCADE);
  
  // creat foreground
  board.createForeground();

  // start battle
  battle.start(team1, team2);

  cursors = game.input.keyboard.createCursorKeys();

}
