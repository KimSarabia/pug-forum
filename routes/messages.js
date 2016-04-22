var express = require('express');
var router = express.Router();

var fs = require('fs');
var _ = require('lodash-node')
var find = require('lodash-node/compat/collection/find')

/* GET messages. */
router.get('/', function(req, res, next) {
  fs.readFile('./messages.json', function(err, data){
    if (err) return res.status(400).send(err);
    var messageArr = JSON.parse(data);
    res.render('messages', {messageArr : messageArr});
  });
});

router.get('/postNewMessage', function(req, res, next) {
    res.render('postNewMessage');
  });

router.post('/add', function(req, res, next){
    fs.readFile('./messages.json', function(err, data){
      if (err) return res.status(400).send(err);
      var messageArr = JSON.parse(data);
      var newMessage = req.body;
      messageArr.push(newMessage);
      fs.writeFile('./messages.json', JSON.stringify(messageArr), function(err){
        if (err) return res.status(400).send(err);
        res.send();
      });
    });
});

router.get('/details/:email', function(req, res, next) {
  var email = req.params.email;
  fs.readFile('./messages.json', function(err, data){
    if (err) return res.status(400).send(err);
    var messageArr = JSON.parse(data);
    var getMessage = find(messageArr, {'email': email});
    res.render('showDetails', {getMessage : getMessage});
  });
});

module.exports = router;
