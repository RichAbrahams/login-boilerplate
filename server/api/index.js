const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const verifyToken = require('./verifyToken'); // eslint-disable-line
const verifyPassword = require('./verifyPassword'); // eslint-disable-line
const verifyResetToken = require('./verifyResetToken'); // eslint-disable-line
const createUser = require('./createUser');
const signIn = require('./signIn');
const retrieveUser = require('./retrieveUser');
const resetPassword = require('./resetPassword');
const router = express.Router();
const updateProfile = require('./updateProfile');
const updatePassword = require('./updatePassword');
const sendResetEmail = require('./sendResetEmail');

const authorizeToken = passport.authenticate('verifyToken', { session: false });
const authorizePassword = passport.authenticate('verifyPassword', { session: false });
const authorizeResetToken = passport.authenticate('verifyResetToken', { session: false });

router.use(bodyParser.json({
  type: '*/*',
}));

router.post('/signin', authorizePassword, signIn);

router.post('/signup', createUser);

router.post('/updateprofile', authorizeToken, updateProfile);

router.post('/updatepassword', authorizeToken, updatePassword);

router.post('/sendresetemail', sendResetEmail);

router.post('/resetpassword', authorizeResetToken, resetPassword);

router.get('/retrieveuser', authorizeToken, retrieveUser);

router.use((err, req, res, next) => {
  console.error(err.stack); // eslint-disable-line
  res.status(500).json({ success: false, error: { _error: 'server error, please retry later' } });
});

module.exports = router;
