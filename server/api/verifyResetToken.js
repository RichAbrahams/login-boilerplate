const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const secret = require('../../config').resetLinkSecret;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret,
  passReqToCallback: true,
};

const jwtResetToken = new JwtStrategy(jwtOptions, async function (req, payload, done) {
  console.log('jwtResetToken');
  console.log('payload', payload);
  console.log('timeout:', (payload.iat + 900000) < Date.now());
  if ((payload.iat + 900000) < Date.now()) {
    done(null, false);
  }
  const col = req
    .db
    .collection('users');
  try {
    const user = await col
      .findOne({ username: payload.sub });
    if (user && user.resetToken) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

passport.use('verifyResetToken', jwtResetToken);
