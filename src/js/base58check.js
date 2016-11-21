const sjcl = require('sjcl');
const bs58 = require('bs58');

export default function base58check(originalKey, versionByte) {

  let key = versionByte + originalKey;

  const checksum = sjcl.codec.hex.fromBits(
    sjcl.hash.sha256.hash(
      sjcl.hash.sha256.hash(
        sjcl.codec.hex.toBits(key)
      )
    )
  ).substring(0, 8).toUpperCase();

  key += checksum;

  const intArray = []

  key.match(/.{1,2}/g).forEach(function(n){
    intArray.push(parseInt(n, 16));
  });

  return bs58.encode(intArray);
}
