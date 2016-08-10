var express = require('express');
var app = express();
var webshot = require('webshot');
var fs = require('fs');


// Where screenshots needs to be stored
var screenShotDestinationURL = 'screenshots';


// Test routing
app.get('/', function (req, res) {
  res.send('Quick test');
});


// Make screenshot
app.get('/screenshot', function(req, res) {
  var url = req.query.url,

      options = {
          renderDelay: 2000,
          screenSize: {
              width: req.query.screenWidth || 1000,
              height: 480
          },
          shotSize: {
              width: req.query.screenWidth || 1000,
              height: 'all'
          },
          userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
      };

      if (typeof url === undefined || typeof url === "undefined") {
        res.json({status: 'ERROR', msg: 'no url'});
      } else {
        var fileDestination = 'screenshots/'+ Date.now() +'-'+url+'.png';

        webshot(url, fileDestination, options, function(err) {
          if (err) {
              res.json({status: 'ERROR', msg: err});
          } else {
              res.json({status: 'OK'});
          }
        });
      }
});


// List all files in the directory
app.get('/list', function(req, res) {
  fs.readdir(screenShotDestinationURL, function(err, items) {
      res.json({status: 'OK', files: items});
  });
});


// Run app
app.listen(8888, function () {
  console.log('localhost:8888!');
});
