var express = require('express');
var app = express();

var mongoose = require('mongoose'); // DB
var helmet = require('helmet'); // Security pluggin
var compression = require('compression'); // Security pluggin
var morgan = require('morgan'); // Reporting

var config = require('./config');
var apiRoutes = require('./routes-be');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public/dist'));
app.use('/api/', apiRoutes);

console.log(config.db.mongodb);

mongoose.connect(config.db.mongodb, function(err) {
    if (err) throw err;
});


var Server = {
    start: function () {
        var port = process.env.PORT || 8888;

        app.listen(port, function () {
            console.log('localhost:'+port);
        });

    }
}


module.exports = Server;