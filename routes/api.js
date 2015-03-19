var express = require('express');
var router = express.Router();

var LevelModel = require('../models/level')
var UserModel = require('../models/user')

router.get('/levels/:number', function(req, res) {

  LevelModel.findOne({number: req.params.number}, function(err, level) {
    console.log(level);
    res.status(200).send(level);
  });
  
});

router.post('/users/', function(req, res) {
  
  UserModel.findOne({username: req.body.username}, function(err, user) {
    if (user) {
      res.status(409).send();
    }

    var new_user = new UserModel({username: req.body.username});
    new_user.save(function(err) {
      res.status(200).send();
    });
  });
});

module.exports = router;
