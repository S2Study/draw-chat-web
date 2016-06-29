var express = require('express');
var router = express.Router();
var models = require("../models");
const defaultRoom = "お絵描きチャット みんなの広場";

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Groups
    .findOrCreate({where: {group_name: defaultRoom}})
    .spread(function(group, created) {
      /*
       {
       username: 'sdepold',
       job: 'Technical Lead JavaScript',
       id: 1,
       createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
       updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
       }
       created: true
      */
      // console.log("#########");
      // console.log(group);
      // console.log(group.get({plain: true}));
      // console.log(created);
      // console.log("#########");
      // group.update({
      //   group_count: group.group_count+1
      // }).then(function() {});
    });
  res.render('index', { title: defaultRoom });
});

router.get('/:group_name', function(req, res, next) {
  models.Groups
    .findOrCreate({where: {group_name: req.params.group_name}})
    .spread(function(group, created) {});
  res.render('index', { title: req.params.group_name });
});

module.exports = router;


