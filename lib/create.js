// var player;
// var platforms;

var board = new window.Rumble.Board
var grid = board.grid;

var cursors;
var tank;
var tile;

window.Rumble.SelectedUnit;
window.Rumble.PathFinder;

function create() {

  board.createBackground();

  // foreground map


  game.physics.startSystem(Phaser.Physics.ARCADE);

  window.bt = new window.Rumble.HeavyTank({ x: 64, y: 128, color: "Blue" });
  window.gt = new window.Rumble.HeavyTank({ x: 320, y: 320, color: "Green" });
  window.gt = new window.Rumble.HeavyTank({ x: 128, y: 320, color: "Green" });


  // heavyTankBlue.animations.add('left', [0,1], 10, true);
  // heavyTankBlue.animations.add('right', [2,3], 10, true);
  //
  // // game.physics.arcade.enable(heavyTankBlue);
  // // heavyTankBlue.body.collideWorldBounds = true;

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

}
