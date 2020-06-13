const express = require('express');

const checkAuth = require('../middleware/check-auth.middleware');

const OrdersController = require('../controllers/orders.controller');

const router = express.Router();


router.get('/', checkAuth, OrdersController.getAllOrders);

router.get('/:orderId', checkAuth, OrdersController.getOrderById);

router.post('/', checkAuth, OrdersController.createOrder);

router.delete('/:orderId', checkAuth, OrdersController.deleteOrderById);


module.exports = router;