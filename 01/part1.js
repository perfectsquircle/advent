var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf8");
var floor = 0;
for (var i = 0; i < input.length; i++) {
  var c = input[i];
  floor += c === "(" ? 1 : -1;
}
console.log(floor);
