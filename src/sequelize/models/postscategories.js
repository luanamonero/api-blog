module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory',
  {}, 
  { timestamps: false });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostsCategory,
      as: 'categories',
    });

    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostsCategory,
      as: 'posts',
    });
  };
  return PostsCategory;
};