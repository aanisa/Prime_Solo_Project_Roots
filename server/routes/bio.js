var express = require('express');
var router = express.Router();
var pg = require('pg');


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
  pool.connect(function(errorConnectingToDatabase, db, done) {

    if (errorConnectingToDatabase) {
      console.log('Error connecting to database');
      res.sendStatus(500);
    } else {
      db.query('SELECT * FROM biography',
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
//pg.connect in POST

//edit bio



//delete bio & person linked to bio



module.exports = router;
