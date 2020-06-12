const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Product = require('../models/product.model')

router.get('/', (req, res) => {
  Product.find()
    .select('name price _id')
    .then(products => {
      const response = {
        count: products.length,
        products: products
      };

      res.status(200).json(response)
    })
    .catch(err => res.status(500).json({ err }));
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  
  Product.update({ _id: id }, { $set: updateOps })
    .then(result => {
      res.json({ message: 'Product Updated' })
    })
    .catch(err => {
      res.status(500).json({ err })
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Product.remove({ _id: id })
    .then(resp => res.json({ message: 'Product Deleted' }))
    .catch(err => res.status(500).json({ err }));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  Product.findById(id)
    .select('name price _id')
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'No Product Found' })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    })
});

router.post('/', (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  });

  product.save()
    .then(result => {
      const response = {
        _id: result._id,
        name: result.name,
        price: result.price
      }
      res.status(200).json(response)
    })
    .catch(err => res.json(err));
})

module.exports = router;