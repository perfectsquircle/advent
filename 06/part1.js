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

function makeLights() {
  return Array(1000).fill(Array(1000).fill(false));
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
    let p = points.next();
    while (p && p.value) {
      let point = p.value;
      let light = lights[point[0]][point[1]];
      lights[point[0]][point[1]] = fn(light);
      // console.log(point, light, lights[point[0]][point[1]]);
      p = points.next();
    }
  });
}

function countLightsOn(array) {
  var sum = 0;
  array.forEach((subArray) => subArray.forEach(light => sum += light ? 1 : 0));
  return sum;
}

var input = fs.readFileSync("input.txt", "utf-8");
var lights = makeLights();
processInput(input, lights);
var lightsOn = countLightsOn(lights);
console.log(lightsOn);
