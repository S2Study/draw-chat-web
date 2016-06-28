var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { room: '広場', title: 'Socket.IO chat' });
});

module.exports = router;
