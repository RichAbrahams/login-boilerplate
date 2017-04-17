const bcrypt = require('bcrypt-nodejs');
const hash = require('./hashPassword');
const generateToken = require('./generateToken');

module.exports = async (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const username = req.body.username.toLowerCase();
  const password = req.body.password.toLowerCase();
  const col = req.db.collection('users');
  try {
    const findUser = await col
      .find({ username })
      .toArray();
    if (findUser.length) {
      return res
        .status(422)
        .json({ error: 'user already exists' });
    }
    const findEmail = await col
      .find({ email })
      .toArray();
    if (findEmail.length) {
      return res
        .status(422)
        .json({ error: 'email already exists' });
    }
    const hashedPassword = await hash(password);
    await col.insertOne({ username, email, password: hashedPassword });
    res.json({ success: true, email, username, token: generateToken(username) });
  } catch (err) {
    console.log(err);
    return next({ err: true });
  }
};
