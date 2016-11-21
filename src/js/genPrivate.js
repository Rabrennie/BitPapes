const Random = require("random-js");

const mt = Random.engines.mt19937();

export default function genPrivate(randInts) {
  const possible = "123456789abcdef";

  mt.seedWithArray(randInts);

  let key = "";

  for (var i = 0; i < 64; i++) {
    const distrubution = Random.integer(0,possible.length-1);
    key += possible.charAt(distrubution(mt));
  }

  return key;
}
