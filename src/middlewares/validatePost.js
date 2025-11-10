const Joi = require('joi');

const postSchema = Joi.object({
  texto: Joi.string().trim().min(3).max(200).required(),
  tags: Joi.array().items(Joi.string().trim()).optional(),
}).messages({
  // title
  'string.base': `"title" debe ser un texto`,
  'string.empty': `"title" no puede estar vacío`,
  'string.min': `"title" debe tener al menos {#limit} caracteres`,
  'string.max': `"title" debe tener como máximo {#limit} caracteres`,
  'any.required': `"title" es un campo obligatorio`,

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


