const Joi = require('joi');

const createTagSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
}).messages({
  'string.base': `"name" debe ser un texto`,
  'string.empty': `"name" no puede estar vacío`,
  'string.min': `"name" debe tener al menos {#limit} caracteres`,
  'string.max': `"name" debe tener como máximo {#limit} caracteres`,
  'any.required': `"name" es un campo obligatorio`,
});

const validateCreateTag = (req, res, next) => {
  const { error, value } = createTagSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = {
  validateCreateTag,
};
