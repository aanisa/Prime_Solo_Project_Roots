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
//DON"T NEED USER ID, SINCE WILL ONLY GRAB WHEN CLICK ON SPECIFIC ID?!?
  console.log('FROM REL GET');
  // res.send('SERVE RELS GOT');
  pool.connect(function(errorConnectingToDatabase, db, done) {

    if (errorConnectingToDatabase) {
      console.log('Error connecting to database');
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM "relations"',
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

module.exports = router;
