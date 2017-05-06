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
  console.log('FROM POST - NEW RELATIVE:', req.body);
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let birthday = req.body.birthday;
  let age = req.body.age;
  let alive = req.body.alive;

  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log("Error connecting to database");
    } else {
      db.query('INSERT INTO "biography" ("user_id", "firstName", "lastName", "birthday", "age", "alive") VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [user_id, firstName, lastName, birthday, age, alive],
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
  console.log('FROM PUT - UPDATE RELATIVE:', req.body);
  let user_id = req.user.id;
  let id = req.body.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let birthday = req.body.birthday;
  let age = req.body.age;
  let alive = req.body.alive;
  let relationtome = req.body.relationtome;
  let birthplace = req.body.birthplace;
  let education = req.body.education;
  let earlyLife = req.body.earlyLife;
  let profession = req.body.profession;
  let interests = req.body.interests;
  let adultLife = req.body.adultLife;
  let email = req.body.email;
  let adress = req.body.adress;
  let homePhone = req.body.homePhone;
  let mobilePhone = req.body.mobilePhone;
  let contactNotes = req.body.contactNotes;


  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to database');
    } else {
      db.query('UPDATE "biography" SET "firstName" = $1, "lastName" = $2, "birthday" = $3, "age" = $4, "alive" =$5, "relationtome" = $6, "birthplace" = $7,  "education" = $8, "earlyLife" = $9,  "profession" = $10, "interests" = $11, "adultLife" = $12, "email" = $13, "adress" = $14, "homePhone" = $15, "mobilePhone" = $16, "contactNotes" = $17 WHERE "user_id"= $18 AND "id"= $19',
      [firstName, lastName, birthday, age, alive,   relationtome, birthplace, education, earlyLife, profession, interests, adultLife, email, adress, homePhone, mobilePhone, contactNotes, user_id, id],
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
  let id = req.params.id;

  pool.connect(function(errorConnectingToDatabase, db, done) {
    if (errorConnectingToDatabase) {
      console.log('Error connecting to database');
      res.sendStatus(500);
    } else {
      db.query('DELETE FROM "biography" WHERE id = $1', [id],
        function(err, result) {
          if (err) {
            console.log('Error making query');
            res.sendStatus(200);
          } else {
            res.sendStatus(200);
          }
        });
    }
  });
});







module.exports = router;
