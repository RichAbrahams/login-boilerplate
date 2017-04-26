const comparePassword = require('./comparePassword');
const hash = require('./hashPassword');

module.exports = async (req, res, next) => {
  try {
    const isMatch = await comparePassword(req.body.oldpassword, req.user.password);
    if (!isMatch) {
      throw new Error('current password incorrect');
    }
    const hashedPassword = await hash(req.body.newpassword);
    const col = req.db.collection('users');
    await col.updateOne(
      { _id: req.user._id },
      { $set: {
        password: hashedPassword,
      } });
    res.json({ success: true });
  } catch (err) {
    return next({ err });
  }
};
