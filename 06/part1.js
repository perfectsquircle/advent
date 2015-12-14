"use strict";
var assert = require("assert");
var fs = require("fs");

function* traverse(startPoint, endPoint) {
  for (var i = startPoint[0]; i <= endPoint[0]; i++) {
    for (var j = startPoint[1]; j <= endPoint[1]; j++) {
      yield [i, j];
    }
  }
}

function turnOn() {
  return true;
}
function turnOff() {
  return false;
}
function toggle(light) {
  return !light;
}

function parseLine(line) {
  var tokens = line.split(" ");
  var stuff = [];
  tokens.forEach((token) => {
    switch (token) {
      case "turn":
      case "through":
        break;
      case "on":
        stuff.push(turnOn);
        break;
      case "off":
        stuff.push(turnOff);
        break;
      case "toggle":
        stuff.push(toggle);
        break;
      default:
        stuff.push(token.split(",").map(Number)); // this is a point
    }
  });
  return stuff;
}

assert.deepEqual(parseLine("turn on 0,0 through 2,2"), [ turnOn, [0,0], [2,2] ]);

function makeLights(size) {
  let lights = [];
  for (let i = 0; i < size; i++) {
    lights.push(Array(size).fill(false));
  }
  return lights;
}

function processInput(input, lights) {
  let lines = input.split("\n");
  lines.forEach(line => {
    if (!line) {
      return;
    }
    let stuff = parseLine(line);
    let fn = stuff[0];
    let points = traverse(stuff[1], stuff[2]);
    for (let point of points) {
      assert.ok(point[0] >= stuff[1][0]);
      assert.ok(point[0] <= stuff[2][0], point[0] + " <= " + stuff[2][0]);
      assert.ok(point[1] >= stuff[1][1]);
      assert.ok(point[1] <= stuff[2][1]);
      let subArray = lights[point[0]];
      subArray[point[1]] = fn(subArray[point[1]]);
    }
  });
}

var testArray = makeLights(4);
processInput("turn on 0,0 through 2,2", testArray);
assert.deepEqual(
[ [ true, true, true, false ],
  [ true, true, true, false ],
  [ true, true, true, false ],
  [ false, false, false, false ] ], testArray);

function countLightsOn(array) {
  var sum = 0;
  array.forEach((subArray) => subArray.forEach(light => sum += light ? 1 : 0));
  return sum;
}

var input = fs.readFileSync("input.txt", "utf-8");
var lights = makeLights(1000);
processInput(input, lights);
var lightsOn = countLightsOn(lights);
console.log(lightsOn);
