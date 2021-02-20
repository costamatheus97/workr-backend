const { verify } = require('jsonwebtoken');

const authConfig = require('../config/auth');

function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  const { secret } = authConfig.jwt;

  if (!authHeader) {
    throw new Error('User not authenticated in the application');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded;

    req.user = {
      id: sub
    };

    return next();
  } catch (error) {
    throw new Error('Invalid JWT token');
  }
}

module.exports = ensureAuthenticated;
