const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(500).json(err));
};

exports.signUpUser = (req, res) => {
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
};

exports.loginUser = (req, res) => {
  User.find({ email: req.body.email })
    .then(user => {
      if (!user.length) {
        return res.status(401).json({ message: 'Auth Failed!' });
      }
      
      bcrypt.compare(req.body.password, user[0].password, (err, resp) => {
        if (err || !resp) {
          return res.status(401).json({ message: 'Auth Failed!' });
        }
        
        const token = jwt.sign({
          email: user[0].email,
          userId: user[0]._id
        },
        "secret",
        {
          expiresIn: "1hr"
        });
        
        res.json({ message: 'Auth Sucessful!', token });
      })
    })
    .catch(err => res.status(500).json(err));
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  
  User.remove({ _id: id })
    .then(result => res.json({ message: 'User Deleted!' }))
    .catch(err => res.status(500).json(err))
}