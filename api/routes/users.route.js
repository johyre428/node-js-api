const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/user.model');

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json(err));
});

router.post('/signup', (req, res) => {
  User.find({ email: req.body.email })
    .then(userResp => {
      if (userResp.length > 0) {
        res.status(400).json({ message: 'User already exists!' });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json(err)
          }
      
          const user = new User({
            email: req.body.email,
            password: hash
          });
          
          user.save()
            .then(result => res.json({ message: 'User Created!' }))
            .catch(err => res.status(500).json(err))
        })
      }
    })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  
  User.remove({ _id: id })
    .then(result => res.json({ message: 'User Deleted!' }))
    .catch(err => res.status(500).json(err))
});

module.exports = router;
