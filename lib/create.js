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

  // background map
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[i].length; j++) {
      tile = game.add.sprite(j * 64, i * 64, 'tiles');
      tile.frame = grid[i][j].land.background;

      tile.inputEnabled = true;
      tile.events.onInputDown.add(handleTileClick, tile);

      grid[i][j].tile = tile;
    }
  }

  // foreground map


  game.physics.startSystem(Phaser.Physics.ARCADE);


  var heavyTankBlue = game.add.sprite(128, 128, 'heavyTankBlue');
  heavyTankBlue.animations.add('left', [0,1], 10, true);
  heavyTankBlue.animations.add('right', [2,3], 10, true);

  // game.physics.arcade.enable(heavyTankBlue);
  heavyTankBlue.inputEnabled = true;
  heavyTankBlue.events.onInputDown.add(handleUnitClick, heavyTankBlue);
  // heavyTankBlue.body.collideWorldBounds = true;

  var heavyTankGreen = game.add.sprite(256, 256, 'heavyTankGreen');
  heavyTankGreen.inputEnabled = true;
  heavyTankGreen.events.onInputDown.add(handleUnitClick, heavyTankGreen);

    //
    // //  We're going to be using physics, so enable the Arcade Physics system
    // game.physics.startSystem(Phaser.Physics.ARCADE);
    //
    // //  A simple background for our game
    // // game.add.sprite(0, 0, 'sky');
    //
    // //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = game.add.group();
    //
    // //  We will enable physics for any object that is created in this group
    // platforms.enableBody = true;
    //
    // // Here we create the ground.
    // var ground = platforms.create(0, game.world.height - 64, 'ground');
    //
    // //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    // ground.scale.setTo(2, 2);
    //
    // //  This stops it from falling away when you jump on it
    // ground.body.immovable = true;
    //
    // //  Now let's create two ledges
    // var ledge = platforms.create(400, 400, 'ground');
    // ledge.body.immovable = true;
    //
    // ledge = platforms.create(-150, 250, 'ground');
    // ledge.body.immovable = true;
    //
    // // The player and its settings
    // player = game.add.sprite(100, game.world.height - 150, 'dude');
    //
    // //  We need to enable physics on the player
    // game.physics.arcade.enable(player);
    //
    // //  Player physics properties. Give the little guy a slight bounce.
    // player.body.bounce.y = 0.2;
    // player.body.gravity.y = 300;
    // player.body.collideWorldBounds = true;
    //
    // //  Our two animations, walking left and right.
    // player.animations.add('left', [0, 1, 2, 3], 10, true);
    // player.animations.add('right', [5, 6, 7, 8], 10, true);
    //
    // //  Finally some stars to collect
    // stars = game.add.group();
    //
    // //  We will enable physics for any star that is created in this group
    // stars.enableBody = true;
    //
    // //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 12; i++)
    // {
    //     //  Create a star inside of the 'stars' group
    //     var star = stars.create(i * 70, 0, 'star');
    //
    //     //  Let gravity do its thing
    //     star.body.gravity.y = 300;
    //
    //     //  This just gives each star a slightly random bounce value
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }
    //
    // //  The score
    // scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();

}

function handleUnitClick() {
  if (window.Rumble.SelectedUnit !== this) {
    var pathFinder = utils.movementCoors(grid, 3, [this.position.y / 64,  this.position.x / 64]);
    board.resetGridBackground();
    board.showMovementForeground(pathFinder);
    updateCurrentSelection(this, pathFinder);
  }
}

function handleTileClick() {
  if (window.Rumble.SelectedUnit !== undefined) {
    board.resetGridBackground();
    // console.log('reset background');

    var i = this.position.y / 64, j = this.position.x / 64;
    if (window.Rumble.PathFinder[[i, j]]) {
      console.log('move to: ', [i, j]);
      window.Rumble.SelectedUnit.position.x = this.position.x;
      window.Rumble.SelectedUnit.position.y = this.position.y;
    }
    resetCurrentSelection();
  }
}

function updateCurrentSelection(unit, pathFinder) {
  window.Rumble.SelectedUnit = unit;
  window.Rumble.PathFinder = pathFinder;
}

function resetCurrentSelection() {
  window.Rumble.SelectedUnit = undefined;
  window.Rumble.PathFinder = undefined;
}
