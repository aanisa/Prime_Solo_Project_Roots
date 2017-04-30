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


router.post('/', function(req, res){
console.log('SAVE NEW REL TO DB', req.body);
res.send('NEW RELATION TO STORE');
});

router.put('/', function(req, res){
console.log('SAVE NEW REL TO DB', req.body);
res.send('NEW RELATION TO STORE');
});



module.exports = router;
