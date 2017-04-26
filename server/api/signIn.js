const generateToken = require('./generateToken');

module.exports = async (req, res, next) => {
  const user = {
    username: req.user.username,
    email: req.user.email,
    city: req.user.city,
    state: req.user.state,
    token: generateToken(req.user.username),
  };
  res.json({ success: true, user });
};
