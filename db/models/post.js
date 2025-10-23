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
        otherKey: 'tagId',
      })
    }
  }
  Post.init({
    texto: {type: DataTypes.TEXT, allowNull:false,
      notEmpty: { msg: 'El post no puede estar vacío' },
      len: {
        args: [1, 1000],
        msg: 'El post debe tener entre 1 y 1000 caracteres'
      }
     },
    userId:{type: DataTypes.INTEGER, allowNull:false }

  }, {
    sequelize,
    modelName: 'Post',
    timestamps:false,
  });
  return Post;
};