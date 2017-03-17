const Wareki = require('./wareki');
const wareki = new Wareki();

console.log(wareki.getEra("H"));
console.log(wareki.getEraByYear("1982"));
console.log(wareki.toWarekiYear("1982"));
console.log(wareki.isValidWareki("S","57","7","13"))

