function preload() {
    game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');

    game.load.spritesheet('lightSoldierRed', 'images/units/lightSoldierRed.png', 64, 64);
    game.load.spritesheet('lightSoldierYellow', 'images/units/lightSoldierYellow.png', 64, 64);
    game.load.spritesheet('lightSoldierBlue', 'images/units/lightSoldierBlue.png', 64, 64);

    game.load.spritesheet('bazookaSoldierRed', 'images/units/bazookaSoldierRed.png', 64, 64);
    game.load.spritesheet('bazookaSoldierYellow', 'images/units/bazookaSoldierYellow.png', 64, 64);

    game.load.spritesheet('lightTankYellow', 'images/units/lightTankYellow.png', 64, 64)
    game.load.spritesheet('lightTankRed', 'images/units/lightTankRed.png', 64, 64)
    game.load.spritesheet('lightTankGreen', 'images/units/lightTankGreen.png', 64, 64)

    game.load.spritesheet('heavyTankRed', 'images/units/heavyTankRed.png', 64, 64)
    game.load.spritesheet('heavyTankYellow', 'images/units/heavyTankYellow.png', 64, 64)
    game.load.spritesheet('heavyTankBlue', 'images/units/heavyTankBlue.png', 64, 64)
    game.load.spritesheet('heavyTankGreen', 'images/units/heavyTankGreen.png', 64, 64)

    game.load.spritesheet('rocketVehicleRed', 'images/units/rocketVehicleRed.png', 64, 64);
    game.load.spritesheet('rocketVehicleYellow', 'images/units/rocketVehicleYellow.png', 64, 64);

    game.load.spritesheet('tiles', 'images/terrain/tiles.png', 64, 64);
    game.load.spritesheet('forests', 'images/terrain/forests.png', 64, 64);

    game.load.spritesheet('button_end_turn', 'images/button_end_turn.png', 267, 85);
    game.load.spritesheet('button_refresh', 'images/button_refresh.png', 55, 47);

    game.load.image('panelBackground', 'images/panelBackground.png');

    game.load.spritesheet('explosion1', 'images/explosion1.png', 64, 64);
    game.load.spritesheet('explosion2', 'images/explosion2.png', 64, 64);

    // game.load.image('sky', 'assets/sky.png');

}
