"use strict";
var assert = require("assert");
var fs = require("fs");

function pairs(word) {
  var count = 0;
  for (var i = 0; i <= word.length - 4; i++) {
    let pair = word[i] + word[i+1];
    for (var j = i+2; j < word.length; j++) {
      let pair2 = word[j] + word[j+1];
      if (pair === pair2) {
        return true;
      }
    }
  }
  return false;
}

assert.ok(pairs("xyxy"), "xyxy");
assert.ok(pairs("aabcdefgaa"), "aabcdefgaa");
assert.ok(!pairs("aaa"), "aaa");

function repeats(word) {
  var count = 0;
  for (var i = 0; i < word.length - 2; i++) {
    if (word[i] === word[i + 2]) {
      return true;
    }
  }
  return false;
}

assert.ok(repeats("xyx"), "xyx");
assert.ok(repeats("abcdefeghi"), "abcdefeghi");
assert.ok(repeats("aaa"), "aaa");

function isNice(word) {
  return pairs(word) && repeats(word);
}

assert.ok(isNice("qjhvhtzxzqqjkmpb"), "qjhvhtzxzqqjkmpb");
assert.ok(isNice("xxyxx"), "xxyxx");
assert.ok(!isNice("uurcxstgmygtbstg"), "uurcxstgmygtbstg");
assert.ok(!isNice("ieodomkazucvgmuy"), "ieodomkazucvgmuy");

var input = fs.readFileSync("input.txt", "utf8");
var lines = input.split("\n");
var niceLines = 0;
lines.forEach(line => niceLines += isNice(line) ? 1 : 0);
console.log(niceLines);
