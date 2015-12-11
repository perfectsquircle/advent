var assert = require("assert");
var fs = require("fs");

function threeVowels(word) {
  var count = 0;
  for (var i = 0; i < word.length; i++) {
    count += "aeiou".indexOf(word[i]) >= 0 ? 1 : 0;
  }
  return count >= 3;
}

assert.ok(threeVowels("aei"), "aei");
assert.ok(threeVowels("xazegov"), "xazegov");
assert.ok(threeVowels("aeiouaeiouaeiou"), "aeiouaeiouaeiou");

function twiceInARow(word) {
  var count = 0;
  for (var i = 0; i < word.length - 1; i++) {
    if (word[i] === word[i + 1]) {
      return true;
    }
  }
  return false;
}

assert.ok(twiceInARow("xx"), "xx");
assert.ok(twiceInARow("abcdde"), "abcdde");
assert.ok(twiceInARow("aabbccdd"), "aabbccdd");

function badStrings(word) {
  return !/ab|cd|pq|xy/.test(word);
}

function isNice(word) {
  return threeVowels(word) && twiceInARow(word) && badStrings(word);
}

assert.ok(isNice("ugknbfddgicrmopn"), "ugknbfddgicrmopn");
assert.ok(isNice("aaa"), "aaa");
assert.ok(!isNice("jchzalrnumimnmhp"), "jchzalrnumimnmhp");
assert.ok(!isNice("haegwjzuvuyypxyu"), "haegwjzuvuyypxyu");
assert.ok(!isNice("dvszwmarrgswjxmb"), "dvszwmarrgswjxmb");

var input = fs.readFileSync("input.txt", "utf8");
var lines = input.split("\n");
var niceLines = 0;
lines.forEach(line => niceLines += isNice(line) ? 1 : 0);
console.log(niceLines);
