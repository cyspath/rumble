function preload() {
    game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

    game.load.spritesheet('lightSoldierRed', 'images/lightSoldierRed.png', 64, 64);
    game.load.spritesheet('lightSoldierYellow', 'images/lightSoldierYellow.png', 64, 64);
    game.load.spritesheet('lightSoldierBlue', 'images/lightSoldierBlue.png', 64, 64);

    game.load.spritesheet('bazookaSoldierRed', 'images/bazookaSoldierRed.png', 64, 64);
    game.load.spritesheet('bazookaSoldierYellow', 'images/bazookaSoldierYellow.png', 64, 64);

    game.load.spritesheet('lightTankYellow', 'images/lightTankYellow.png', 64, 64)
    game.load.spritesheet('lightTankRed', 'images/lightTankRed.png', 64, 64)
    game.load.spritesheet('lightTankGreen', 'images/lightTankGreen.png', 64, 64)

    game.load.spritesheet('heavyTankRed', 'images/heavyTankRed.png', 64, 64)
    game.load.spritesheet('heavyTankYellow', 'images/heavyTankYellow.png', 64, 64)
    game.load.spritesheet('heavyTankBlue', 'images/heavyTankBlue.png', 64, 64)
    game.load.spritesheet('heavyTankGreen', 'images/heavyTankGreen.png', 64, 64)

    game.load.spritesheet('rocketVehicleRed', 'images/rocketVehicleRed.png', 64, 64);
    game.load.spritesheet('rocketVehicleYellow', 'images/rocketVehicleYellow.png', 64, 64);

    game.load.spritesheet('tiles', 'images/tiles.png', 64, 64);

    game.load.spritesheet('button_end_turn', 'images/button_end_turn.png', 267, 85);
    game.load.spritesheet('button_refresh', 'images/button_refresh.png', 55, 47);

    game.load.image('panelBackground', 'images/panelBackground.png');

    game.load.spritesheet('explosion1', 'images/explosion1.png', 64, 64);
    game.load.spritesheet('explosion2', 'images/explosion2.png', 64, 64);

    // game.load.image('sky', 'assets/sky.png');

}