const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const CustomerService = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();
const customerService = new CustomerService();

router.get('/',
  passport.authenticate('jwt', {session: false} ),
  async (req, res, next) => {
    try {
      const order = await service.find(req.query);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', {session: false} ),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', {session: false} ),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const customer = await customerService.findByUser(user.sub);
      const body = {
        ...req.body,
        customerId: customer.id
      }
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  passport.authenticate('jwt', {session: false} ),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
