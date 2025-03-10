const Joi = require('joi');

const token = Joi.string();
const newPassword = Joi.string().min(8);

const resetPasswordSchema = Joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

module.exports = { resetPasswordSchema }
