var express = require('express');
var router = express.Router();
var models = require("../models");
const defaultRoom = "お絵描きチャット みんなの広場";

/* GET home page. */
router.get('/', function(req, res, next) {
  findGroups(defaultRoom, res);
});

router.get('/:group_name', function(req, res, next) {
  findGroups(req.params.group_name, res);
});

function findGroups(room, res) {
  models.Groups
    .findOrCreate({where: {group_name: room}})
    .spread(function(group, created) {
      models.Messages
        .findAll({
          where: {
            group_id: group.id
            ,deleted: false
          }
          ,order: [ ['id', 'DESC'] ]
          ,limit: 20
        })
        .then(function(messages) {
          res.render('index', { title: room, messages: messages });
        });
    });
}

module.exports = router;


