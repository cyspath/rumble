function preload() {
    game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

    game.load.spritesheet('lightSoldierBlue', 'images/lightSoldierBlue.png', 64, 64);
    game.load.spritesheet('heavyTankBlue', 'images/heavyTankBlue.png', 64, 64)
    game.load.spritesheet('heavyTankGreen', 'images/heavyTankGreen.png', 64, 64)
    game.load.spritesheet('heavyTankYellow', 'images/heavyTankYellow.png', 64, 64)

    game.load.spritesheet('tiles', 'images/tiles2.png', 64, 64);

    game.load.spritesheet('button_end_turn', 'images/button_end_turn.png', 267, 85);


    // game.load.image('sky', 'assets/sky.png');

}
