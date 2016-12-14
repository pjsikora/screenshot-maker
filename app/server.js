var express = require('express');
var app = express();

var mongoose = require('mongoose'); // DB
var helmet = require('helmet'); // Security pluggin
var compression = require('compression'); // Security pluggin
var morgan = require('morgan'); // Reporting

// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
var passport = require('passport');
// var session = require('express-session');
// var flash = require('connect-flash');

var config = require('./config');
var apiRoutes = require('./routes-be');
var jwt = require('jsonwebtoken');

app.set('superSecret', config.secret);
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public/dist'));
// app.use(cookieParser()); // read cookies (needed for auth)
// app.use(session({ secret: 'makeitsecret' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash()); // use connect-flash for flash messages stored in session


// require('./config/passport')(passport);

// Routing setting
app.use('/api/', apiRoutes);

console.log(config.db.mongodb);

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb, function (err) {
    if (err) throw err;
});


var Server = {
    start: function () {
        var port = process.env.PORT || 8888;

        app.listen(port, function () {
            console.log('localhost:' + port);
        });

    }
}


module.exports = Server;