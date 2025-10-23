'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User , {
        foreignKey:'userId'
      })
      Comment.belongsTo(models.Post , {
        foreignKey:'postId'
      })
    }
  }
  Comment.init({
    texto: {type: DataTypes.STRING, allowNull:false,
      validate: {
      notEmpty: {
        msg: 'El comentario no puede estar vacío'
      }
     }
     },
    postId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER, allowNull:false },
  }, {
    sequelize,
    modelName: 'Comment',
    
  });
  return Comment;
};