const service = require('../services/categories');

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await service.create({ name });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await service.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  create,
  getAll,
}; 