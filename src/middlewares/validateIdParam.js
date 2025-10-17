const Joi = require('joi');

const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
}).messages({
  'number.base': 'El parámetro :id debe ser un número',
  'number.integer': 'El parámetro :id debe ser entero',
  'number.positive': 'El parámetro :id debe ser positivo',
  'any.required': 'El parámetro :id es obligatorio',
});

const validateIdParam = (req, res, next) => {
  const { error } = idParamSchema.validate(req.params);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};

module.exports = {
  validateIdParam,
};