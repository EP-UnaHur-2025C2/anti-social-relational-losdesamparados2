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
            allowNull: false},
    postId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Post_Images',
    timestamps:false,
  });
  return Post_Images;
};