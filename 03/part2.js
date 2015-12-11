var fs = require("fs");
var assert = require("assert");

function getMovement(direction) {
  switch (direction) {
    case "<":
      return [-1, 0];
    case ">":
      return [1, 0];
    case "^":
      return [0, 1];
    case "v":
      return [0, -1];
  }
}

function generateMap(directions) {
  var x = 0;
  var y = 0;
  var x2 = 0;
  var y2 = 0;
  const map = new Map();
  map.set(`${x},${y}`, 1);
  for (var i = 0; i < directions.length; i++) {
    var direction = directions.substr(i, 1);
    var movement = getMovement(direction);
    var pair;
    if (i % 2 === 0) {
      x += movement[0];
      y += movement[1];
      pair = `${x},${y}`;
    } else {
      x2 += movement[0];
      y2 += movement[1];
      pair = `${x2},${y2}`;
    }
    if (map.has(pair)) {
      map.set(pair, map.get(pair) + 1);
    } else {
      map.set(pair, 1);
    }
  }
  return map;
}

function countHouses(input) {
  var map = generateMap(input);
  return map.size;
}

assert.equal(countHouses("^v"), 3);
assert.equal(countHouses("^>v<"), 3);
assert.equal(countHouses("^v^v^v^v^v"), 11);

var input = fs.readFileSync("./input.txt", "utf-8");
console.log(countHouses(input));
