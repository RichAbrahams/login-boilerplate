const generateToken = require('./generateResetLink');
const nodemailer = require('nodemailer');

function sendMail(username, email, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fccbookclubproject@gmail.com',
      pass: 'uCaEZMft',
    },
  });

  const mailOptions = {
    from: 'fccbookclubproject@gmail.com',
    to: `${email}`,
    subject: 'You requested a password reset',
    html: `<b>Hello ${username}</b>
    <p>You requested a link to reset you password.</p>
    <p>Please click on the following link to go to our password reset page:</p>
    <a href="http://localhost:3000/resetpassword?token=${token}">http://localhost:3000/passwordresest?token=${token}</a>
    <p>This link will remain valid for 15 minutes.</p>
    `,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return new Error(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = async (req, res, next) => {
  try {
    const col = req
      .db
      .collection('users');
    const user = await col
        .findOne({ username: req.body.username });
    if (!user) {
      throw new Error('username not registered');
    } else {
      const token = generateToken(user.username);
      await col.updateOne(
      { _id: user._id },
        { $set: {
          resetToken: token,
        } });
      await sendMail(user.username, user.email, token);
      res.json({ success: true });
    }
  } catch (err) {
    return next({ err });
  }
};
