var express = require('express');
var router = express.Router();

var LevelModel = require('../models/level')

router.get('/levels/:number', function(req, res) {

  LevelModel.findOne({number: req.params.number}, function(err, level) {
    console.log(level);
    res.status(200).send(level);
  });
  
});

module.exports = router;
