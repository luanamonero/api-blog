const service = require('../services/user');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await service.create({ displayName, email, password, image });
    if (token.message) return res.status(token.code).json(token.message);
    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await service.getAll();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await service.getById(id);
    if (users.message) return res.status(users.code).json(users.message);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};