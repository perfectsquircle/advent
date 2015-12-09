const fs = require("fs");
const input = fs.readFileSync("./input.txt", "utf8");
var lines = input.split("\n");
var assert = require("assert");

function getLength(l, w, h) {
  var parts = [l, w, h];
  parts.sort((a, b) => a > b);
  console.dir(parts);
  var a = parts[0];
  var b = parts[1];
  var volume = l * w * h;
  return 2*a + 2*b + volume;
}

assert.equal(getLength(4, 3, 2), 34);
assert.equal(getLength(1, 1, 10), 14);


var ribbon = 0;
lines.forEach((line) => {
  const parts = line.split("x");
  var l = parseInt(parts[0], 10);
  var w = parseInt(parts[1], 10);
  var h = parseInt(parts[2], 10);
  if (!l) { return; }
  var length = getLength(l, w, h);
  ribbon += length;
});

console.log(ribbon);
