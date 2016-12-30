(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  window.Rumble.land = {
    grassland:         { default: 0, pathFinderShade: 1, type: "normal" },
    grasslandForest1:  { default: 2, pathFinderShade: 3, type: "forest" },
    grasslandForest2:  { default: 4, pathFinderShade: 5, type: "forest" },
    grasslandForest3:  { default: 6, pathFinderShade: 7, type: "forest" },
    grasslandRock:     { default: 22, pathFinderShade: 23, type: "rock" },
    sight:             { default: 30, visible: 31, type: "sight" }
  }

})();
