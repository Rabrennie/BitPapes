

var count = 100;
var randInt = [];
var mt = Random.engines.mt19937()

function mousemove(e) {
  count -= 1;

  if(count > 0) {
    randInt.push(e.screenX * e.screenY);
  } else {
    window.removeEventListener('mousemove', mousemove);
    randThing();
  }
}

function randThing() {
  mt.seedWithArray(randInt);

  var possible = "123456789abcdef";

  key = "";

  for (var i = 0; i < 64; i++) {
    key += possible.charAt(Random.integer(0,possible.length)(mt))
  }

  window.orig = "0x"  +key;

  key = "80" + key;

  var sha256 = sjcl.hash.sha256.hash(
    sjcl.hash.sha256.hash(
      sjcl.codec.hex.toBits(key)
    )
  );

  sha256 = sjcl.codec.hex.fromBits(sha256);

  key += sha256.substring(0,8).toUpperCase();

  var intArray = []

  key.match(/.{1,2}/g).forEach(function(n){
    intArray.push(parseInt(n, 16));
  });


  var ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

  var base58 = new base(ALPHABET);

  document.querySelector('.out').innerHTML = base58.encode(intArray);

  window.ec = new elliptic.ec('secp256k1');

}

window.addEventListener('mousemove', mousemove);
