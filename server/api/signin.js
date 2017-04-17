const generateToken = require('./generateToken');

module.exports = async (req, res, next) => {
  res.json({ signin: true, user: req.user });
//res.json({ token: generateToken(req.user) });
};
