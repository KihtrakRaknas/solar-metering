// One-time use file to generate key to authorize server to upload

const { charset } = require('mime-types');
var secureRandom = require('secure-random');
var signingKey = secureRandom.randomArray(256)

console.log("#"+signingKey.map(el=>String.fromCharCode(el)).join("")+"#")