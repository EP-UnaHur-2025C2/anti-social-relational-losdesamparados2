const Joi = require('joi');


const createCommentSchema = Joi.object({
  content: Joi.string().trim().min(1).max(500).required(),
  userId: Joi.number().integer().positive().required(),
  postId: Joi.number().integer().positive().required(),
}).messages({
  // content
  'string.base': "El campo 'content' debe ser un texto",
  'string.empty': "El campo 'content' no puede estar vacío",
  'string.min': "El campo 'content' debe tener al menos {#limit} caracteres",
  'string.max': "El campo 'content' debe tener como máximo {#limit} caracteres",
  'any.required': "Todos los campos obligatorios deben estar completos",

  // userId y postId
  'number.base': "Los campos 'userId' y 'postId' deben ser números",
  'number.integer': "Los campos 'userId' y 'postId' deben ser enteros",
  'number.positive': "Los campos 'userId' y 'postId' deben ser positivos",
});

const filterOldComments = (req, res, next) => {
  const monthsLimit = process.env.COMMENT_MAX_MONTHS || 6;
  req.commentFilter = { visibleSince: monthsLimit };
  next();
};

const comments = await Comment.findAll({
  where: {
    createdAt: { [Op.gte]: moment().subtract(req.commentFilter.visibleSince, 'months').toDate() }
  }
});


const validateCreateComment = (req, res, next) => {
  const { error, value } = createCommentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = {
    validateCreateComment,
    filterOldComments
}