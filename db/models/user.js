'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
        User.hasMany(models.Post, {
          foreignKey: 'userId'
        })
        User.hasMany(models.Comment, {
          foreignKey: 'userId'
        })
    }
  }
  User.init({
    nickname: {type: DataTypes.STRING, unique:true, allowNull:false, 
      validate: {
        notEmpty: {msg: 'El nickname no puede estar vacio'},
        len: {
          args: [3,30],
          msg: 'El nickname debe tener entre 3 y 30 caracteres'
        }
      }
    },
    email:{type: DataTypes.STRING , allowNull: false,
      validate: {
      isEmail: { msg: 'Debe ser un email válido' },
      notEmpty: { msg: 'El email no puede estar vacío' }
    }}
  }, {
    sequelize,
    modelName: 'User',
    timestamps:false,
  });
  return User;
};