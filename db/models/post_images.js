'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Images extends Model {
    
    static associate(models) {
      Post_Images.belongsTo(models.Post, {
        foreignKey: 'postId'
      })
    }
  }
  Post_Images.init({
    url: {type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isUrl: { msg: 'Debe ser una URL válida' }
          }},
    postId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Post_Images',
    timestamps:false,
  });
  return Post_Images;
};