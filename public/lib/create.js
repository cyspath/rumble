// var player;
// var platforms;

var board = new window.Rumble.Board;
var battle = new window.Rumble.Battle;
var grid = board.grid;

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

  board.createBackground();

  // foreground map


  game.physics.startSystem(Phaser.Physics.ARCADE);

  var bs = window.bs = new window.Rumble.LightSoldier({x: 0, y: 64, color: "Blue"});
  var bt = window.bt = new window.Rumble.HeavyTank({ x: 0, y: 0, color: "Blue" });
  var gt1 = new window.Rumble.HeavyTank({ x: 320, y: 320, color: "Green" });
  var gt2 = new window.Rumble.HeavyTank({ x: 128, y: 128, color: "Green" });

  game.physics.arcade.enable([ bt.model, gt1.model ], Phaser.Physics.ARCADE);


  var team1 = [bs, bt];
  var team2 = [gt1, gt2];
  battle.start(team1, team2);


  // var tween = game.add.tween(bt.model.body).
  //   to( { y: 500 }, 1000, Phaser.Easing.Linear.None, true).
  //   to( { x: 500, y: 300 }, 1000, Phaser.Easing.Linear.None, true).
  //   to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true)

  //.onComplete.add(f, 300)
  // var b = game.add.tween(window.bt.model.body).to( { x: 100, y: 200 }, 1000, Phaser.Easing.Linear.None, true, 0)

  // a.chain(b)

  // tween.onStart.add(onStart, this);
  //
  // tween.onRepeat.add(onLoop, this);


  // game.add.tween(bt.model.body).to( { x: 500 }, 3000, Phaser.Easing.Linear.None, true);

  // heavyTankBlue.animations.add('left', [0,1], 10, true);
  // heavyTankBlue.animations.add('right', [2,3], 10, true);
  //
  // // game.physics.arcade.enable(heavyTankBlue);
  // // heavyTankBlue.body.collideWorldBounds = true;

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

}
//
// function onStart() {
//
// 	//	Turn off the delay, so it loops seamlessly from here on
// 	tween.delay(0);
//
// }
//
// function onLoop() {
//   x += 100;
//   y += 100;
// }
