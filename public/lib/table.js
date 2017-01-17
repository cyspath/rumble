(function () {
  if (typeof utils === "undefined") {
    window.Rumble = {};
  }
  var Rumble = window.Rumble;

  Rumble.DamageVsArmor = {
    "light-light": 1, "light-medium": 0.8, "light-heavy": 0.5,
    "medium-light": 1, "medium-medium": 1, "medium-heavy": 1,
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

  Rumble.Terrain = [
    {
      type: 'summer',
      land:           { default: 20, pathFinderShade: 21, type: "normal" },
      forest:         { default: 0, pathFinderShade: 0, type: "forest" },
      rock:           { default: 28, pathFinderShade: 29, type: "rock" },
      overlayFrame:   { default: 40, sight: 42 }
    },
    {
      type: 'winter',
      land:           { default: 0, pathFinderShade: 1, type: "normal" },
      forest:         { default: 0, pathFinderShade: 0, type: "forest" },
      rock:           { default: 8, pathFinderShade: 9, type: "rock" },
      overlayFrame:   { default: 40, sight: 42 }
    }
  ]





})();
