// var player;
// var platforms;

var cursors;
var tank;
var tile;
var matrix = window.Rumble.matrix;

function create() {

  // background map
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      tile = game.add.sprite(i * 64, j * 64, 'tiles');
      tile.frame = matrix[i][j].background;
    }
  }

  // foreground map


  tank = game.add.sprite(128, 128, 'tank');
  tank.animations.add('up', [9,10,11], 10, true);
  tank.animations.add('down', [0,1,2], 10, true);
  tank.animations.add('left', [6,7,8], 10, true);
  tank.animations.add('right', [3,4,5], 10, true);

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
