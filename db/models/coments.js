'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Coments.belongsTo(models.User , {
        foreignKey:'userId'
      })
      Coments.belongsTo(models.Post , {
        foreignKey:'postId'
      })
    }
  }
  Coments.init({
    texto: DataTypes.STRING,
    postId: {type: DataTypes.STRING},
    userId: {type: DataTypes.STRING, allowNull:false },
  }, {
    sequelize,
    modelName: 'Coments',
  });
  return Coments;
};