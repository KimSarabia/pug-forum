'use strict';

var db = require('../config/db');
var uuid = require('uuid');

db.run('CREATE TABLE IF NOT EXISTS messages (id text, name text, email text, phone text, message text)');

exports.create = function(message, cb) {
  // todo:  add validation
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO messages VALUES (?, ?, ?, ?, ?)");
    stmt.run( uuid(), message.name, message.email, message.phone, message.message );
    stmt.finalize(cb);
  });
};

exports.findAll = function(cb) {
  db.all('SELECT * FROM messages', function(err, messages) {
    cb(err, messages);
  });
};
