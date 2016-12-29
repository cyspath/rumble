# RUMBLE
<img src='https://raw.github.com/cyspath/thunderbird/gh-pages/assets/images/tb-edited.gif' align='center' padding='10px'>

## [Play it live here] (http://107.170.239.150/)
### Overview

Turn based strategy game made with object-oriented javascript and phaser.js.
Players take turns to move/attack.
AI player is coming soon.

### Stages
There are four stages, each stage increases in difficulty.
* Asteroids
* Alien fleet wave one
* Alien fleet wave two
* Final Boss

### Animation/Graphics

* No game engine was used. Explosion uses custom animation by snapshotting various frames of a sprite sheet in the Explosion class.
* Images were edited on Gimp2 and stored in Cloudinary.

### Additional Details

* Player's highest score will be kept in your browser's `localStorage`
* Thunderbird has shields, which goes away completely after two hits or collisions with enemies. Get hit one more time makes you lose the game.
* Crushing into greater enemies will not only lose shields but your entire ship as well.
