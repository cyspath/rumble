// var stars;
// var score = 0;
// var scoreText;
//

function update() {

    // //  Collide the player and the stars with the platforms
    // game.physics.arcade.collide(player, platforms);
    // game.physics.arcade.collide(stars, platforms);
    //
    // //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // game.physics.arcade.overlap(player, stars, collectStar, null, this);
    //
    // //  Reset the players velocity (movement)
    // player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      tank.animations.play('left');
    } else if (cursors.right.isDown) {
      tank.animations.play('right');
    } else if (cursors.up.isDown) {
      tank.animations.play('up');
    } else if (cursors.down.isDown) {
      tank.animations.play('down');
    }

    // if (cursors.left.isDown)
    // {
    //     //  Move to the left
    //     player.body.velocity.x = -150;
    //
    //     player.animations.play('left');
    //
    //     tank.animations.play('left');
    // }
    // else if (cursors.right.isDown)
    // {
    //     //  Move to the right
    //     player.body.velocity.x = 150;
    //
    //     player.animations.play('right');
    //
    //     tank.animations.play('right');
    // }
    // else
    // {
    //     //  Stand still
    //     player.animations.stop();
    //
    //     player.frame = 4;
    // }
    //
    // //  Allow the player to jump if they are touching the ground.
    // if (cursors.up.isDown && player.body.touching.down)
    // {
    //     player.body.velocity.y = -350;
    // }

}

// function collectStar (player, star) {
//
//     // Removes the star from the screen
//     star.kill();
//
//     //  Add and update the score
//     score += 10;
//     scoreText.text = 'Score: ' + score;
//
// }
