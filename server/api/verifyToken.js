const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../../config').secret;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret,
  passReqToCallback: true,
};

const jwtLogin = new JwtStrategy(jwtOptions, async function (req, payload, done) {
  const col = req
    .db
    .collection('users');
  try {
    const user = await col
      .find({ username: payload.sub }, { email: 1, username: 1 })
      .toArray();
    if (user.length) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

passport.use(jwtLogin);
