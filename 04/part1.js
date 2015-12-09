var crypto = require("crypto");
var input = "yzbqklnj";

for (var i = 1; true; i++) {
  var hasher = crypto.createHash("md5");
  var hash = "";
  hasher.update(input + i, "ascii");
  hash = hasher.digest("hex");
  // console.log(hash);
  if (hash.startsWith("00000")) {
    break;
  }
}

console.log(i);
