
const jwt = require('jsonwebtoken')
const keySecret = process.env.KEY_SECRET_TOKEN
const keySecretRefresh = process.env.KEY_SECRET_REFRESH_TOKEN

module.exports.generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

module.exports.genarateRanNumber = (length) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

module.exports.genarateAccessToken = (id, role) => {
  const token = jwt.sign({ _id: id, role}, keySecret, { expiresIn: '1h' })

  return token
}

module.exports.genarateRefreshToken = (id) => {
  const token = jwt.sign({ _id: id, }, keySecretRefresh, { expiresIn: '7d' })

  return token

}


