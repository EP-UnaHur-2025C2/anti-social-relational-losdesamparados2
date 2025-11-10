const Joi = require('joi');

// 🔹 Schema de validación
const createCommentSchema = Joi.object({
  content: Joi.string().trim().min(1).max(500).required(),
  userId: Joi.number().integer().positive().required(),
  postId: Joi.number().integer().positive().required(),
}).messages({
  'string.base': "El campo 'content' debe ser un texto",
  'string.empty': "El campo 'content' no puede estar vacío",
  'string.min': "El campo 'content' debe tener al menos {#limit} caracteres",
  'string.max': "El campo 'content' debe tener como máximo {#limit} caracteres",
  'any.required': "Todos los campos obligatorios deben estar completos",
  'number.base': "Los campos 'userId' y 'postId' deben ser números",
  'number.integer': "Los campos 'userId' y 'postId' deben ser enteros",
  'number.positive': "Los campos 'userId' y 'postId' deben ser positivos",
});

// 🔹 Middleware para validar creación de comentario
const validateCreateComment = (req, res, next) => {
  const { error, value } = createCommentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

// 🔹 (Opcional) filtro por antigüedad de comentarios
const filterOldComments = (req, res, next) => {
  const monthsLimit = process.env.COMMENT_MAX_MONTHS || 6;
  req.commentFilter = { visibleSince: monthsLimit };
  next();
};

module.exports = {
  validateCreateComment,
  filterOldComments
};
