const sjcl = require('sjcl');
const RIPEMD160 = require('ripemd160');

import base58check from './base58check';

export default function calculateAddress(originalKey) {

  const sha256 = sjcl.codec.hex.fromBits(
    sjcl.hash.sha256.hash(
        sjcl.codec.hex.toBits(originalKey)
      )
  );

  const rip = new RIPEMD160().update(sha256, 'hex').digest('hex');
  return base58check(rip, '00');
}
