const express = require('express');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth.middleware');

const ProductsController = require('../controllers/products.controller');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.indexOf('image') >= 0) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.get('/', ProductsController.getAllProducts);

router.get('/:id', ProductsController.getProductById);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.createProduct);

router.put('/:id', checkAuth, ProductsController.updateProductById);

router.delete('/:id', checkAuth, ProductsController.deleteProductById);

module.exports = router;