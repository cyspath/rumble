(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

   var land = window.Rumble.land;

   function generateMatrix(width, height) {
     var m = new Array(height);
     for (var i = 0; i < height; i++) {
       m[i] = new Array(width);
       for (var j = 0; j < m[i].length; j++) {
         m[i][j] = undefined;
       }
     }
     return m;
   }

   function addDesert(matrix) {
     for (var i = 0; i < matrix.length; i++) {
       for (var j = 0; j < matrix[i].length; j++) {
         matrix[i][j] = land.desert;
       }
     }
   }

   function addHills(matrix) {
     for (var i = 0; i < matrix.length; i++) {
       for (var j = 0; j < matrix[i].length; j++) {
         if (utils.percentChance(10)) {
           matrix[i][j] = [land.desertHill1, land.desertHill2, land.desertHill3][utils.randomBoundBy(0, 2)];
         }
       }
     }
   }

  function build() {
    var matrix = generateMatrix(10, 10);
    addDesert(matrix);
    addHills(matrix);
    return matrix;
  }

  var matrix = window.Rumble.matrix = build();

})();
