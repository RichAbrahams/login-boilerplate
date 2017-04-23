const createUser = require('./createUser');
const signin = require('./signin');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const verifyToken = require('./verifyToken');
const verifyPassword = require('./verifyPassword');
const passport = require('passport');

const authorizeToken = passport.authenticate('jwt', { session: false });
const authorizePassword = passport.authenticate('local', { session: false });

router.use(bodyParser.json({
  type: '*/*',
}));

router.get('/test', authorizeToken, (req, res) => {
  console.log(req.user);
  res.json({ success: true });
});

router.post('/signin', authorizePassword, (req, res) => {
  console.log('signin hit');
  res.json({ success: true, user: req.user });
});

router.post('/signup', createUser);

router.get('/retrieveuser', authorizeToken, (req, res) => {
  console.log(req.user);
  res.json(req.user[0]);
});

router.use((err, req, res, next) => {
  console.error(err.stack); // eslint-disable-line

  res.status(500).json({ success: false, error: { _error: 'server error, please retry later' } });
});

module.exports = router;
