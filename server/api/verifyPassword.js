const passport = require('passport');
const LocalStrategy = require('passport-local');
const comparePassword = require('./comparePassword');
const generateToken = require('./generateToken');

const jwtOptions = {
  usernameField: 'email',
  passReqToCallback: true,
};

const localLogin = new LocalStrategy(jwtOptions, async function (req, email, password, done) {
  const col = req
    .db
    .collection('users');
  try {
    const findUser = await col
      .find({ email })
      .toArray();
    console.log('user', findUser);
    if (!findUser.length) {
      return done(null, false);
    }
    const isMatch = await comparePassword(password, findUser[0].password);
    if (!isMatch) {
      return done(null, false);
    }
    const user = Object.assign({}, { username: findUser[0].username, email: findUser[0].email, token: generateToken(findUser[0].username) });
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

passport.use(localLogin);
