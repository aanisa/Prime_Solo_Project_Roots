var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(express.static('/server/public'));
app.use(bodyParser.urlencoded({extended:true}));








//set port
app.set('port', (process.env.PORT || 5000));

//listen for port
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
