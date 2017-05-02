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
      db.query('SELECT * FROM "relations" WHERE user_id = $1', [user_id],
        function(err, result) {
          done();
          if (err) {
            console.log('Error making query!');
            res.sendStatus(500);
          } else {
            console.log('GET RELS From database: ', result.rows);
            res.send(result.rows);
          }
        });
    }
  });
});


router.post('/', function(req, res) {
  console.log('POST > NEW REL', req.body);

  let user_id = req.user.id;
  let person_id = req.body.person_id;
  let mother_id = req.body.mother_id;
  let father_id = req.body.father_id;

  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log("Error connecting to database");
    } else {
      db.query('INSERT INTO "relations" ("user_id", "person_id", "mother_id", "father_id") VALUES ($1, $2, $3, $4) RETURNING id',
      [user_id, person_id, mother_id, father_id],
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

router.put('/', function(req, res) {
  console.log('UPDATE NEW RELATION TO DB', req.body);
  let user_id = req.user.id;
  let person_id = req.body.person_id;
  let mother_id = req.body.mother_id;
  let father_id = req.body.father_id;

  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to database');
    } else {
      db.query('UPDATE "relations" SET "mother_id" = $1, "father_id" = $2 WHERE "user_id"= $3 AND "person_id"= $4',
      [mother_id, father_id, user_id, person_id],
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

router.delete('/:id', function(req, res) {
  console.log('TO DELETE:', req.params);
  let id = req.params;
  res.send('DEEEEEEELETED!!!');
});



module.exports = router;
