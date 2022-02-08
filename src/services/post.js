/* eslint-disable no-labels */
const Sequelize = require('sequelize');
const { PostsCategory, BlogPost, Category, User } = require('../sequelize/models');
const config = require('../sequelize/config/config');

const sequelize = new Sequelize(config.development);

const getAll = async () => {
  const posts = await BlogPost.findAll(
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] },
    );

  return posts;
};

const getById = async (id) => {
  const posts = await BlogPost.findByPk(
    id,
    { include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ] },
    );
  if (!posts) {
    return { 
      code: 404,
      message: {
        message: 'Post does not exist',
      },
    };
  }
  return posts;
};

const arrayCategories = async (categories, id) => {
  const newArray = [];
  categories.forEach((category) => {
    newArray.push({ postId: id, category });
  });
  return newArray;
};

const createBlog = async (id, { title, content, categoryIds }) => {  
  const t = await sequelize.transaction();
  try {
    const blogpost = await BlogPost
      .create({ title, content, userId: id }, { transaction: t });
    const array = arrayCategories(categoryIds, blogpost.id);
    await PostsCategory.bulkCreate(array, { transaction: t });

    await t.commit();

    return {
      id: blogpost.id,
      userId: id,
      title,
      content,
    };
  } catch (err) {
    await t.rollback();
  }
};

module.exports = {
  createBlog,
  getAll,
  getById,
};