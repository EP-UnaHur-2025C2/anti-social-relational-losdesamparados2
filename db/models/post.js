'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
  
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Post.hasMany(models.Comment, {
        foreignKey: 'postId'
      })
      Post.hasMany(models.Post_Images, {
        foreignKey: 'postId'
      })
      Post.belongsToMany(models.Tag, {
        through: 'PostTag',
        foreignKey: 'postId',
        otherKey: 'tagId'
      })
    }
  }
  Post.init({
    texto: {type: DataTypes.TEXT, allowNull:false},
    userId:{type: DataTypes.INTEGER, allowNull:false }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps:false,
  });
  return Post;
};