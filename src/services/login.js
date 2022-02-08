const jwt = require('jsonwebtoken');
const { User } = require('../sequelize/models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    return { 
      code: 400,
      message: {
        message: 'Invalid fields',
      },
    };
  }

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = {
  login,
};