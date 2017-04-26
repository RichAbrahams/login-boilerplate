const secret = require('../../config').resetLinkSecret;
const jwt = require('jwt-simple');

module.exports = (username) => {
  const timestamp = Date.now();
  return jwt.encode({ sub: username, iat: timestamp }, secret);
};
