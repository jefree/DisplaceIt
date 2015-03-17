var express = require('express');
var router = express.Router();

router.get('/levels/:number', function(req, res) {
  var currentWorld = {
    chars: [{x:2, y:0}, {x:2, y:2}, {x:4, y:4}, {x:4, y:0}],
    winPos: {x:2, y:1}
  };

  res.status(200).send(currentWorld);
});

module.exports = router;
