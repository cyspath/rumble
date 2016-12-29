(function () {
  if (typeof Rumble === "undefined") {
    window.Rumble = {};
  }

  window.Rumble.land = {
    desert:           { default: 10, pathFinderShade: 11, rangeFinderShade: 30, type: "normal" },
    desertMountain1:  { default: 12, pathFinderShade: 13, rangeFinderShade: 30, type: "mountain" },
    desertMountain2:  { default: 14, pathFinderShade: 15, rangeFinderShade: 30, type: "mountain" },
    desertMountain3:  { default: 16, pathFinderShade: 17, rangeFinderShade: 30, type: "mountain" }
  }

})();
