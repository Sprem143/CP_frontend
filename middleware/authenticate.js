const jwt = require('jsonwebtoken');
const secret = 'mysecret';

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access denied');
  }
  try {
    const verified = jwt.verify(token.split(' ')[1], secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = authenticateJWT;
