var express = require('express');
var router = express.Router();

var LevelModel = require('../models/level')
var UserModel = require('../models/user')

router.get('/levels/:number', function(req, res) {

  LevelModel.findOne({number: req.params.number}, function(err, level) {
    res.status(200).send(level);
  });
  
});

router.post('/users/', function(req, res) {

  UserModel.findOne({username: req.body.username}, function(err, user) {

    if (user) {
      res.status(409).send();
      return;
    }

    var new_user = new UserModel({username: req.body.username, password: req.body.password, level: 1});
    new_user.save(function(err) {
      res.status(200).send();
    });

  });
});

router.post('/users/login/', function(req, res) {
  UserModel.findOne({username: req.body.username}, function(err, user) {

    if (!user || user.password != req.body.password) {
      res.status(401).send();
      return;
    }

    res.status(200).send({level: user.level});
  });
});

router.put('/users/level', function(req, res) {

  UserModel.findOne({username: req.body.username}, function(err, user) {

    if (!user) {
      res.status(401).send();
      return;
    }

    if (user.password != req.body.password) {
      res.status(401).send();
      return;
    }

    user.level = req.body.level;

    user.save(function(){
      res.status(200).send();
    });

  });
});

module.exports = router;
