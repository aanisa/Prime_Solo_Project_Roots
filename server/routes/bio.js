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
      db.query('SELECT * FROM "biography" WHERE "user_id" = $1', [user_id],
        function(err, result) {

          done();
          if (err) {
            console.log('Error making query!');
            res.sendStatus(500);
          } else {
            // console.log('GET From database: ', result.rows);
            res.send(result.rows);
          }
        });
    }
  });
});


// Save created realtion bio to db
router.post('/', function(req, res) {
  let user_id = req.user.id;
  console.log('FROM POST:', req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let birthday = req.body.birthday;
  let age = req.body.age;
  let alive = req.body.alive;

  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log("Error connecting to database");
    } else {
      db.query('INSERT INTO "biography" ("user_id", "firstName", "lastName", "birthday", "age", "alive") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [user_id, firstName, lastName, birthday, age, alive],
        function(err, result) {
          if (err) {
            console.log('Error making query!');
            res.sendStatus(500);
          } else {
            res.send(result);
          }
        });
    }
  });
});



//edit bio
router.put('/', function(req, res) {
  console.log('FROM PUT:', req.body);
  let user_id = req.user.id;
  let id = req.body.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let birthday = req.body.birthday;
  let age = req.body.age;
  let alive = req.body.alive;

  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to database');
    } else {
      db.query('UPDATE "biography" SET "firstName" = $1, "lastName" = $2, "birthday" = $3, "age" = $4, "alive" =$5 WHERE "user_id"= $6 AND "id"= $7',
      [firstName, lastName, birthday, age, alive, user_id, id],
        function(err, result) {
          if (err) {
            console.log('Error making query!');
            res.sendStatus(500);
          } else {
            res.send(result.rows);

          }
        });
    }
  });
});




//delete bio & person linked to bio









module.exports = router;
