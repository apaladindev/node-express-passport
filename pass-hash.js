const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPass = 'admin 123 .032';
  const hash = await bcrypt.hash(myPass, 10);
  console.log('Hash: ' + hash);
}

hashPassword();
