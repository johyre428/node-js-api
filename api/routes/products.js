const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  })
});

router.put('/:id', (req, res) => {
  res.status(200).json({
    message: 'Updated product'
  })
});

router.delete('/:id', (req, res) => {
  res.status(200).json({
    message: 'Deleted product'
  })
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  if (id === 'special') {
    res.status(200).json({
      message: 'You discoverd special ID',
      id
    })
  } else {
    res.status(200).json({
      message: 'You passed an ID'
    })
  }
});

router.post('/', (req, res) => {
  res.status(200).json({
    message: 'Handling POST request to /products'
  })
})

module.exports = router;