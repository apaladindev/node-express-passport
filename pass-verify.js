const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPass = 'admin 123 .032';
  const hash = '$2b$10$iGF3ql4xUY1Y4vSvZ1K6ZuxK7oEioOviPG71HlNHOL6Pac/QJ.ADm';
  const isMatch = await bcrypt.compare(myPass, hash);
  console.log('Match: ' + isMatch);
}

verifyPassword();
