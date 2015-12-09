var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf8");
var lines = input.split("\n");
var assert = require("assert");

function getArea(l, w, h) {
  var min = Math.min(l*w, Math.min(w*h, h*l));
  console.log(l, w, h, min);
  return (2*l*w) + (2*w*h) + (2*h*l) + min;
}

assert.equal(getArea(2, 3, 4), 58);
assert.equal(getArea(1, 1, 10), 43);


var wrappingPaper = 0;
lines.forEach(function(line) {
  var l, w, h;
  var parts = line.split("x");
  l = parseInt(parts[0], 10);
  w = parseInt(parts[1], 10);
  h = parseInt(parts[2], 10);
  if (!l) { return; }
  var area = getArea(l, w, h);
  wrappingPaper += area;
});

console.log(wrappingPaper);
