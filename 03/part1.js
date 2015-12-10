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
  const map = new Map();
  map.set(`${x},${y}`, 1);
  for (var i = 0; i < directions.length; i++) {
    const direction = directions[i];
    const movement = getMovement(direction);
    x += movement[0];
    y += movement[1];
    var pair = `${x},${y}`;
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

assert.equal(countHouses(">"), 2);
assert.equal(countHouses("^>v<"), 4);
assert.equal(countHouses("^v^v^v^v^v"), 2);


var input = fs.readFileSync("./input.txt", "utf-8");
console.log(countHouses(input));
