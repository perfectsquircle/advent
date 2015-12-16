var assert = require("assert");

function countCharactersOfCode(stringLiteral) {
  return stringLiteral.length;
}

function countCharactersInString(stringLiteral) {
  var x = eval(stringLiteral);
  return x.length;
}

assert.equal(countCharactersOfCode('""'), 2);
assert.equal(countCharactersInString('""'), 0);

assert.equal(countCharactersOfCode('"abc"'), 5);
assert.equal(countCharactersInString('"abc"'), 3);

assert.equal(countCharactersOfCode('"aaa\\"aaa"'), 10);
assert.equal(countCharactersInString('"aaa\\"aaa"'), 7);

assert.equal(countCharactersOfCode('"\\x27"'), 6);
assert.equal(countCharactersInString('"\\x27"'), 1);


var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");

var charactersForStringLiterals = 0;
var charactersInMemory = 0;

var lines = input.split("\n");
lines.forEach(function(line) {
  if (line) {
    charactersForStringLiterals += countCharactersOfCode(line);
    charactersInMemory += countCharactersInString(line);
  }
});

console.log(charactersForStringLiterals - charactersInMemory);
