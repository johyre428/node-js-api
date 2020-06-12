const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Product = require('../models/product.model')

router.get('/', (req, res) => {
  Product.find()
    .then(products => {
      res.status(200).json(products)
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
      res.json(result)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Product.remove({ _id: id })
    .then(resp => res.json(resp))
    .catch(err => res.status(500).json({ err }));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  Product.findById(id)
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
      res.status(200).json(result)
    })
    .catch(err => res.json(err));
})

module.exports = router;