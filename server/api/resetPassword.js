const hash = require('./hashPassword');

module.exports = async (req, res, next) => {
  try {
    const hashedPassword = await hash(req.body.password);
    const col = req
      .db
      .collection('users');
    await col.updateOne({
      _id: req.user._id,
    }, {
      $set: {
        password: hashedPassword,
      },
      $unset: {
        resetToken: '',
      },
    });
    res.json({ success: true });
  } catch (err) {
    return next({ err });
  }
};
