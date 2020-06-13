const Order = require('../models/order.model');
const Product = require('../models/product.model');

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .select('_id product quantity')
    .populate('product', 'name')
    .then(orders => {
      res.status(200).json(orders)
    })
    .catch(err => res.status(500).json(err))
};

exports.getOrderById = (req, res, next) => {
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
}

exports.createOrder = (req, res, next) => {
  const productId = req.body.product;

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
};

exports.deleteOrderById = (req, res, next) => {
  const id = req.params.orderId

  Order.remove({ _id: id })
    .then(result => res.json({ message: 'Order deleted!'}))
    .catch(err => res.status(500).json(err))
};