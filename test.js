const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'arat';

const hash = bcrypt.hashSync(myPlaintextPassword, 10);
const hash1 = bcrypt.compareSync(myPlaintextPassword, hash);
console.log("hash1 : ", hash1)