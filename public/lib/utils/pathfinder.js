(function () {
  if (typeof utils === "undefined") {
    window.utils = {};
  }

  // A* path finding logic
  utils.pathfinder = function(startCoor, targetCoor, grid, unit) {
    var Node = function (coor, h, g, parentNode) {
      this.h = h; // estimated distance to target (Manhattan)
      this.g = g; // total movement cost to get to this node
      this.f = h + g; // h + g
      this.parent = parentNode;
      this.coor = coor;
      this.key = String(coor);
    }

    function hValue(startCoor, targetCoor) {
      return Math.abs(startCoor[0] - targetCoor[0]) + Math.abs(startCoor[1] - targetCoor[1]);
    }

    function lowestFValue(list) {
      var node;
      for (var key in list) {
        if (!list[key]) {
          continue;
        } else if (!node || list[key].f < node.f) {
          node = list[key];
        }
      }
      return node;
    }

    function adjacentCoors(coor) {
      var coors = [[coor[0] - 1, coor[1]], [coor[0] + 1, coor[1]], [coor[0], coor[1] - 1], [coor[0], coor[1] + 1]];
      return coors.filter(function (c) {
        if (grid[c[0]] && grid[c[0]][c[1]] && unit.canMoveThroughCoor(grid[c[0]][c[1]])) { // walkable condition check here
          return c;
        }
      })
    }

    var openList = {}, closeList = {}, startNode, newNode;
    startNode = new Node(startCoor, hValue(startCoor, targetCoor), 0, undefined);
    openList[startNode.key] = startNode;

    function recurse(currentNode) {
      // drop current node from open and add to close list
      openList[currentNode.key] = undefined;
      closeList[currentNode.key] = currentNode;

      // check all of the adjacent squares. Ignoring those that are on the closed list or unwalkable
      // add squares to the open list if they are not on the open list already
      // make the selected square the “parent” of the new squares.
      var coors = adjacentCoors(currentNode.coor, grid);
      for (var i = 0; i < coors.length; i++) {
        var coor = coors[i];
        if (closeList[coor]) {
          continue;
        } else if (openList[coor]) {
          newNode = openList[coor];
          if (newNode.g < currentNode.g + 1) {
            newNode.g = currentNode.g + 1;
            newNode.f = newNode.h + newNode.g;
            newNode.parent = currentNode;
          }
        } else {
          newNode = new Node(coor, hValue(coor, targetCoor), currentNode.g + 1, currentNode);
          openList[newNode.key] = newNode;
          if (newNode.key == String(targetCoor)) {
            return newNode;
          }
        }
      }
      return recurse(lowestFValue(openList));
    }

    var node = recurse(startNode);

    // back trace the coordinates
    var pathList = [];
    while (node) {
      pathList.push(node.coor);
      node = node.parent;
    }

    return pathList = pathList.reverse(); // includes starting coor and ending coor
  }


})();
