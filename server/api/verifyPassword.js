const passport = require('passport');
const LocalStrategy = require('passport-local');
const comparePassword = require('./comparePassword');

const jwtOptions = {
  usernameField: 'email',
  passReqToCallback: true,
};

const localLogin = new LocalStrategy(jwtOptions, async function (req, email, password, done) {
  console.log('localLogin');
  const col = req
    .db
    .collection('users');
  try {
    const user = await col
      .findOne({ email });
    if (!user) {
      return done(null, false);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

passport.use('verifyPassword', localLogin);
