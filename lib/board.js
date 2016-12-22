(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

   var land = window.Rumble.land;

   function generateGrid(width, height) {
     var m = new Array(height);
     for (var i = 0; i < height; i++) {
       m[i] = new Array(width);
       for (var j = 0; j < m[i].length; j++) {
         m[i][j] = { pos: [i, j], land: undefined, tile: undefined };
       }
     }
     return m;
   }

   function addDesert(grid) {
     for (var i = 0; i < grid.length; i++) {
       for (var j = 0; j < grid[i].length; j++) {
         grid[i][j].land = land.desert;
       }
     }
   }

   function addHills(grid) {
     for (var i = 0; i < grid.length; i++) {
       for (var j = 0; j < grid[i].length; j++) {
         if (utils.percentChance(10)) {
           grid[i][j].land = [land.desertHill1, land.desertHill2, land.desertHill3][utils.randomBoundBy(0, 2)];
         }
       }
     }
   }

  function build() {
    var grid = generateGrid(10, 10);
    addDesert(grid);
    addHills(grid);
    return grid;
  }

  var Board = window.Rumble.Board = function () {
    this.build();
  }

  Board.prototype.build = function() {
    this.grid = generateGrid(10, 10);
    addDesert(this.grid);
    addHills(this.grid);
  }

  Board.prototype.resetGridBackground = function () {
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].tile.frame = this.grid[i][j].land.background;;
      }
    }
  };

  Board.prototype.showMovementForeground = function (coors) {
    for (var coor in coors) {
      coor = coor.split(",")
      grid[coor[0]][coor[1]].tile.frame = grid[coor[0]][coor[1]].land.foreground;
    }
  };

})();
