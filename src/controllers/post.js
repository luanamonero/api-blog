const service = require('../services/post');
const { Category } = require('../sequelize/models');

const createBlog = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { dataValues: { id } } = req.user;
    const categoryId = await Category.findAll({ where: { id: categoryIds } });
    
    if (categoryId.length !== categoryIds.length) { 
    return res.status(400).json({ message: '"categoryIds" not found' });
    }
    const blog = await service.createBlog(id, { title, content, categoryIds });
    if (blog.message) return res.status(blog.code).json(blog.message);
    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await service.getAll();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await service.getById(id);
    if (post.message) return res.status(post.code).json(post.message);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAll,
  getById,
};