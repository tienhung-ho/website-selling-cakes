// jwt.helpers.js
const jwt = require('jsonwebtoken');

module.exports.createToken = (user) => {
  let keySecret = process.env.SECRET_KEY;
  console.log(keySecret);
  return jwt.sign({ id: user._id, username: user.username }, keySecret, { expiresIn: '0.5h' });
};
