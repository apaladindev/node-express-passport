const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0MTQxMjk2OH0.xRmGuTF2VTFzXCKJiUExfrnfMD3Ccc8GpfUtp1fdouw";

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
