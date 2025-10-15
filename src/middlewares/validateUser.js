const Joi = require('joi');

const userSchema = Joi.object({
nickName: Joi.string().alphanum().min(3).max(30).required(),
email: Joi.string().email().trim().lowercase().required(), // lowerCase convierte todos los caracteres a minuscula y trim quita los espacios en blanco
password: Joi.string().min(6).max(15).required(),
})

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false, stripUnknown: true });
  if (error) {
    const errors = error.details.map(d => d.message);
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = {
    validateUser
}

//en userRoutes poner const {validarUser} = require('../middlewares/validateUser')
// en router.get ('/user', validarUser, userController.getUsers);





