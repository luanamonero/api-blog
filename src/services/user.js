const jwt = require('jsonwebtoken');
const { User } = require('../sequelize/models');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const create = async ({ displayName, email, password, image }) => {
  const isRegistered = await User.findOne({ where: { email } });

  if (isRegistered) {
    return { 
      code: 409,
      message: {
        message: 'User already registered',
      },
    };
  }

  const user = await User.create({ displayName, email, password, image });

  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

const getAll = async () => {
  const users = await User.findAll({ 
    attributes: ['id', 'displayName', 'email', 'image'], 
  });
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id, 
    { 
      attributes: ['id', 'displayName', 'email', 'image'], 
  });

  if (!user) {
    return { 
      code: 404,
      message: {
        message: 'User does not exist',
      },
    };
  }
  
  return user;
};

module.exports = {
  create,
  getAll,
  getById,
};
