const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required(),
  content: Joi.string().trim().min(1).required(),
  userId: Joi.number().integer().required(), //dudas
  tags: Joi.array().items(Joi.string().trim()).optional(),
}).messages({
  // title
  'string.base': `"title" debe ser un texto`,
  'string.empty': `"title" no puede estar vacío`,
  'string.min': `"title" debe tener al menos {#limit} caracteres`,
  'string.max': `"title" debe tener como máximo {#limit} caracteres`,
  'any.required': `"title" es un campo obligatorio`,

  // content
  'string.base': `"content" debe ser un texto`,
  'string.empty': `"content" no puede estar vacío`,
  'string.min': `"content" debe tener al menos {#limit} caracteres`,
  'any.required': `"content" es un campo obligatorio`,

  // userId
  'number.base': `"userId" debe ser un número`,
  'number.integer': `"userId" debe ser un número entero`,
  'any.required': `"userId" es un campo obligatorio`,

  // tags
  'array.base': `"tags" debe ser un arreglo de texto`,
  'string.base': `"tags" solo puede contener texto`,
});

const validatePost = (req, res, next) => {
    const { error, value } = postSchema.validate(req.body);   
    if (error){
        return res.status(400).json({ error: error.message });
    }
    req.body = value; 
    next();
}


module.exports = {
    validatePost
}


