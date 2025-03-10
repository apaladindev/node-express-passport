const express = require('express');
const passport = require('passport');
const validatorHandler = require('./../middlewares/validator.handler');
const { resetPasswordSchema } = require('./../schemas/auth.schema');
const AuthService = require('./../services/auth.service');

const router = express.Router();
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const sign = service.signToken(user);
      res.json(sign);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await service.sendRecovery(email);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  validatorHandler(resetPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const result = await service.changePassword(token, newPassword);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
