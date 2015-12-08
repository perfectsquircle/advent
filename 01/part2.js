var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf8");
var floor = 0;
var index;
for (var i = 0; i < input.length; i++) {
  var c = input[i];
  floor += c === "(" ? 1 : -1;
  if (floor < 0) {
    index = i;
    break;
  }
}
console.log(index + 1);
