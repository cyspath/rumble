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

setInterval(function () {
  var su = window.Rumble.SelectedUnit;
  var txt = su ? (su.type + su.color) : su;
  console.log(txt);
}, 500)

function create() {
  // create background
  board.createBackground();

  // create units
  game.physics.startSystem(Phaser.Physics.ARCADE);
  var bs = window.bs = new window.Rumble.LightSoldier({x: 128, y: 64, color: "Blue"});
  var bt = window.bt = new window.Rumble.HeavyTank({ x: 128, y: 0, color: "Blue" });
  var gt1 = new window.Rumble.HeavyTank({ x: 320, y: 320, color: "Green" });
  var gt2 = new window.Rumble.HeavyTank({ x: 256, y: 128, color: "Green" });
  game.physics.arcade.enable([ bt.model, gt1.model ], Phaser.Physics.ARCADE);

  // creat foreground
  board.createForeground();

  // start battle
  var team1 = [bs, bt];
  var team2 = [gt1, gt2];
  battle.start(team1, team2);


  cursors = game.input.keyboard.createCursorKeys();

}
