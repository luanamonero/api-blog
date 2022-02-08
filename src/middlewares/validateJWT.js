const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../sequelize/models');

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await User.findByPk(decoded.data.id);

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
}; 

module.exports = {
  auth,
};