const Product = require('../models/product.model');

exports.getAllProducts = (req, res) => {
  Product.find()
    .select('name price _id productImage')
    .then(products => {
      const response = {
        count: products.length,
        products: products
      };

      res.status(200).json(response)
    })
    .catch(err => res.status(500).json({ err }));
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  
  Product.findById(id)
    .select('name price _id, productImage')
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
};

exports.createProduct = (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });

  product.save()
    .then(result => {
      console.log(result);
      const response = {
        _id: result._id,
        name: result.name,
        price: result.price
      }
      res.status(200).json(response)
    })
    .catch(err => res.json(err));
};

exports.updateProductById = (req, res) => {
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
};

exports.deleteProductById = (req, res) => {
  const id = req.params.id;

  Product.remove({ _id: id })
    .then(resp => res.json({ message: 'Product Deleted' }))
    .catch(err => res.status(500).json({ err }));
};

