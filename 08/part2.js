"use strict";
var assert = require("assert");

function countCharactersOfCode(stringLiteral) {
  return stringLiteral.length;
}

function countCharactersReencode(stringLiteral) {
  let enc = stringLiteral.replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');
  enc = `"${enc}"`;
  return enc.length;
}

assert.equal(countCharactersOfCode('""'), 2);
assert.equal(countCharactersOfCode('"abc"'), 5);
assert.equal(countCharactersOfCode('"aaa\\"aaa"'), 10);

assert.equal(countCharactersOfCode('"\\x27"'), 6);
assert.equal(countCharactersReencode('""'), 6);
assert.equal(countCharactersReencode('"abc"'), 9);
assert.equal(countCharactersReencode('"aaa\\"aaa"'), 16);
assert.equal(countCharactersReencode('"\\x27"'), 11);


var fs = require("fs");
var input = fs.readFileSync("./input.txt", "utf-8");

var charactersForStringLiterals = 0;
var charactersEncoded = 0;

var lines = input.split("\n");
lines.forEach(function(line) {
  if (line) {
    charactersForStringLiterals += countCharactersOfCode(line);
    charactersEncoded += countCharactersReencode(line);
  }
});

console.log(charactersEncoded - charactersForStringLiterals);
