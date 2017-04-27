var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var passport = require('./strategies/user_sql.js');
var session = require('express-session');

// Routes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var bio = require('./routes/bio');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('./server/public'));

// Passport Session Configuration                // can make config secret when deploying this - gitignore - have sample ppl can fill in on their own and include in documentation later
app.use(session({                                //will need to update this before deployement, make it more secure
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/bio', bio);
app.use('/register', register);
app.use('/user', user);
app.use('/*', index);


//set port
app.set('port', (process.env.PORT || 5000));

//listen for port
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
