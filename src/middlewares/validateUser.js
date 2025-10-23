const Joi = require('joi');

const userSchema = Joi.object({
nickName: Joi.string().alphanum().min(3).max(30).required(),
email: Joi.string().email().trim().lowercase().required(), // lowerCase convierte todos los caracteres a minuscula y trim quita los espacios en blanco
password: Joi.string().min(6).max(15).required(),
}).messages({
  'string.base': `"Campo" debe ser un texto`, 
  'string.empty': `"nickName / email / password" no puede estar vacío`,  
  'string.min': `"nickName / email / password" debe tener al menos {#limit} caracteres`,
  'string.max': `"nickName / email / password" debe tener como máximo {#limit} caracteres`,
  'string.email': `"email" debe ser un email válido`,
  'any.required': `"nickName / email / password" es un campo obligatorio`,
  'string.alphanum': `"nickName" solo puede contener letras y números`
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body); 
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
};


module.exports = {
    validateUser
}







