(function () {
  if (typeof utils === "undefined") {
    window.Rumble = {};
  }
  var Rumble = window.Rumble;

  Rumble.DamageVsArmor = {
    "light-light": 1, "light-medium": 1, "light-heavy": 0.5,
    "medim-light": 1, "medim-medium": 1, "medim-heavy": 1,
    "heavy-light": 0.5, "heavy-medium": 1, "heavy-heavy": 1.5
  };

  Rumble.TerrainMovementReduction = {
    "foot-normal":  "NO CHANGE",
    "foot-forest":  "REDUCED BY 1",
    "foot-bushes":  "NO CHANGE",
    "foot-rock":    "REDUCED BY 2",
    "foot-road":    "NO CHANGE",
    "foot-sea":     undefined,
    "wheel-normal": "NO CHANGE",
    "wheel-forest": "REDUCED BY 2",
    "wheel-bushes": "REDUCED BY 2",
    "wheel-rock":   undefined,
    "wheel-road":   "INCREASED BY 2",
    "wheel-sea":    undefined,
    "track-normal": "NO CHANGE",
    "track-forest": undefined,
    "track-bushes": "REDUCED BY 1",
    "track-rock":   undefined,
    "track-road":   "NO CHANGE",
    "track-sea":    undefined,
    "plane-normal": "NO CHANGE",
    "plane-forest": "NO CHANGE",
    "plane-bushes": "NO CHANGE",
    "plane-rock":   "NO CHANGE",
    "plane-road":   "NO CHANGE",
    "plane-sea":    "NO CHANGE",
    "ship-normal":  undefined,
    "ship-forest":  undefined,
    "ship-bushes":  undefined,
    "ship-rock":    undefined,
    "ship-road":    undefined,
    "ship-sea":     "NO CHANGE"
  };

  Rumble.Terrain = {
    grassland:         { default: 0, pathFinderShade: 1, type: "normal" },
    grasslandForest1:  { default: 10, pathFinderShade: 11, type: "forest" },
    grasslandForest2:  { default: 12, pathFinderShade: 13, type: "forest" },
    grasslandForest3:  { default: 14, pathFinderShade: 15, type: "forest" },
    grasslandBushes1:  { default: 2, pathFinderShade: 3, type: "bushes" },
    grasslandBushes2:  { default: 4, pathFinderShade: 5, type: "bushes" },
    grasslandRock:     { default: 28, pathFinderShade: 29, type: "rock" },
    overlayFrame:      { default: 30, sight: 32, selected1: 40, selected2: 41 }
  };




})();
