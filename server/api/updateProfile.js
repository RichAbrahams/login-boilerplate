
module.exports = async (req, res, next) => {
  console.log(req.user.body);
  const email = req.body.email.toLowerCase();
  const city = req.body.city.toLowerCase();
  const state = req.body.state.toLowerCase();
  try {
    const col = req.db.collection('users');
    const result = await col.updateOne(
      { _id: req.user._id },
      { $set: {
        email,
        city,
        state,
      } });
    res.json({
      email,
      city,
      state,
    });
  } catch (err) {
    return next({ err: true });
  }
};
