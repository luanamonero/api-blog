const { Category } = require('../sequelize/models');

const create = async ({ name }) => {
  const category = await Category.create({ name });
  return category;
};

const getAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  create,
  getAll,
};