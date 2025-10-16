'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Post.hasMany(models.Coments, {
        foreignKey: 'postId'
      })
      Post.hasMany(models.Post_Images, {
        foreignKey: 'postId'
      })
      Post.belongsToMany(models.Tag, {
        through: 'PostTag',
        foreignKey: 'postId',
        otherKey: 'tagId',
      })
    }
  }
  Post.init({
    texto: DataTypes.STRING,
    userId:{type: DataTypes.STRING, allowNull:false }

  }, {
    sequelize,
    modelName: 'Post',
    timestamps:false,
  });
  return Post;
};