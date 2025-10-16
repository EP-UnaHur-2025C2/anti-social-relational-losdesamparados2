'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post_Images.belongsTo(models.Post, {
        foreignKey: 'postId'
      })
    }
  }
  Post_Images.init({
    Url: DataTypes.STRING,
    postId: {type: DataTypes.STRING}
  }, {
    sequelize,
    modelName: 'Post_Images',
    timestamps:false,
  });
  return Post_Images;
};