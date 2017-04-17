const secret = require('../../config').secret;
const jwt = require('jwt-simple');

module.exports = (username) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: username, iat: timestamp }, secret);
};
