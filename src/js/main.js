var secp256k1 = require('secp256k1')
const bs58 = require('bs58');
const Random = require("random-js");
const mt = Random.engines.mt19937().autoSeed();
const qrcode = require('qrcode-js');

import '../sass/style.scss';
import genPrivate from './genPrivate';
import base58check from './base58check';
import calculateAddress from './calculateAddress';

const moves = 1000;
let count = 0;
const randInts = []

const progress = document.querySelector('.progress')
const privateKeyOut = document.querySelector('.private .key')
const publicKeyOut = document.querySelector('.public .address')

init();

function init() {
  const distrubution = Random.integer(-9007199254740992 , 9007199254740992 );
  randInts.push(distrubution(mt));
  generator();
}

function onMouseMove(e) {
  count += 1;

  if(count < moves) {
    const distrubution = Random.integer(-9007199254740992 , 9007199254740992 );
    randInts.push(distrubution(mt) * e.screenX * e.screenY);
    progress.innerHTML = Math.floor((count/moves)*100+1) + '%';

  } else {
    window.removeEventListener('mousemove', onMouseMove);
  }
  generator();
}

function generator() {
  const privateKey = genPrivate(randInts);
  privateKeyOut.innerHTML = base58check(privateKey, '80');
  const base64Private = qrcode.toDataURL(base58check(privateKey, '80'), 4);
  document.querySelector('.privateImg').src = base64Private;

  const publicKey = secp256k1.publicKeyCreate(new Buffer(privateKey, 'hex'), false).toString('hex');
  publicKeyOut.innerHTML = calculateAddress(publicKey);
  const base64Public = qrcode.toDataURL(calculateAddress(publicKey), 4);
  document.querySelector('.publicImg').src = base64Public;

}

window.addEventListener('mousemove', onMouseMove)
