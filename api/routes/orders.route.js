const express = require('express');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const Order = require('../models/order.model');
const Product = require('../models/product.model');

router.get('/', checkAuth, (req, res, next) => {
  Order.find()
    .select('_id product quantity')
    .populate('product', 'name')
    .then(orders => {
      res.status(200).json(orders)
    })
    .catch(err => res.status(500).json(err))
});

router.post('/', checkAuth, (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId)
    .then(product => {
      if (product) {
        const order = new Order({
          product: productId,
          quantity: req.body.quantity
        });
      
        return order.save();
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .then(result => {
      const response = {
        _id: result._id,
        product: result.product,
        quantity: result.quantity
      }

      res.status(201).json(response);
    })
    .catch(err => res.status(500).json(err));
});

router.get('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId

  Order.findById(id)
    .select('_id product quantity')
    .populate('product', 'name')
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Order not found' })
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
  const id = req.params.orderId

  Order.remove({ _id: id })
    .then(result => res.json({ message: 'Order deleted!'}))
    .catch(err => res.status(500).json(err))
});


module.exports = router;