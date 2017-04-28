/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var user = require('../strategies/user_sql.js');


var config = {
  database: 'Roots',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1500
};

var pool = new pg.Pool(config);


//GET bio
router.get('/', function(req, res) {
let user_id = req.user.id;
  pool.connect(function(errorConnectingToDatabase, db, done) {

    if (errorConnectingToDatabase) {
      console.log('Error connecting to database');
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM biography WHERE user_id = $1', [user_id],
        function(err, result) {
          done();
          if (err) {
            console.log('Error making query!');
            res.sendStatus(500);
          } else {
            console.log('From database: ', result.rows);
            res.send(result.rows);
          }
        });
    }
  });
});

//Save bio to db
router.post('/', function(req, res) {
  let user_id = req.user.id;
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log("Error connecting to database");
    } else {
      db.query('INSERT INTO biography (user_id, firstName, lastName, birthday, age, alive) VALUES ($1, $2, $3, $4, $5, $6)',
      [user_id, firstName, lastName, birthday, age, alive],
      function(err, result){
        if (err) {
          console.log('Error making query!');
          res.sendStatus(500);
        } else {
          res.send(result);
          res.sendStatus(200);
        }
      });
    }
  });
});
//edit bio
router.put('/', function(req, res) {
console.log('from post req:', req.body);
console.log(req.body);
res.send('from server: will send to db');
});


//delete bio & person linked to bio










module.exports = router;
