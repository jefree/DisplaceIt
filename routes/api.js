var express = require('express');
var router = express.Router();

var LevelModel = require('../models/level')

router.get('/levels/:number', function(req, res) {

  var currentWorld = {
    chars: [{x:4, y:4}, {x:2, y:3}, {x:4, y:0}, {x:1, y:1}],
    winPos: {x:2, y:2},
    number: 1
  };

  LevelModel.findOne({number: req.params.number}, function(err, level) {
    console.log(level);
    res.status(200).send(level);
  });

  //var level = new LevelModel(currentWorld);
  //level.save();

  //res.status(200).send(currentWorld);
});

module.exports = router;
