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

## AI logic
* AI will take turns for all his units, in random order.
* To attack: for each unit AI will attempt to attack first, if no target can be attack, AI will move its unit, and try to attack again.
* To move: for each unit, AI will rank its enemy's units by their distance to each of its own units using a _customized A* pathfinding algorithm_, and _move towards one of the closest enemies with favorable damage and armor exchange outcome as well avoiding unfavorable terrain when possible_.

### Additional Details

* Generally, a unit can attack after moving, but cannot move after attacking every turn.
* Smooth unit interaction: can attack without reselecting unit that just moved and reselecting unit when previous selected unit has not moved
* Units have moved or attacked controlled by you will no longer display movement and attack finder. However, anytime during your turn you may select opponent's units to see their movement and attack finder in order to make a good move.
* HP bar width scales with unit max HP and anchored to parent sprite model.
* Units can move past friendly units, but enemies occupying a square will block its path through that square.

### Gameplay Must-knows:

* Damage type - armor type calculation, actual damage done:
```
"light damage vs. light armor": 1, "light damage vs. medium armor": 1, "light damage vs. heavy armor": 0.5
"medim damage vs. light armor": 1, "medim damage vs. medium armor": 1, "medim damage vs. heavy armor": 1
"heavy damage vs. light armor": 0.5, "heavy damage vs. medium armor": 1, "heavy damage vs. heavy armor": 1.5
```

### Dev process

* units initial stats inspired by http://kongregate.wikia.com/wiki/Units_of_Battalion_Versions
* fonts used from https://cooltext.com/
