const bcrypt = require('bcrypt-nodejs');

module.exports = function (candidate, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidate, password, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });
};
