var express = require('express');
var app = express();
var webshot = require('webshot');
var fs = require('fs');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/screenshot', function(req, res) {
  console.log('/screenshot');
  // console.log(req);
  var screenWidth = req.query.screenWidth || 1200,
      screenHeight = req.query.screenHeight || 'all',
      url = req.query.url,
      file = req.query.file,
      group = req.query.group,

      screenShotDestinationURL = '/screenshots',

      options = {
          screenSize: {
              width: 2000,
              height: 480
          },
          shotSize: {
              width: 2000,
              height: 'all'
          }
          // , userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
      };

      if (typeof url === undefined || typeof url === "undefined") {
        res.json({status: 'ERROR', msg: 'no url'});
      } else {
        var fileDestination = 'screenshots/'+ Date.now() +'-'+url;

        webshot(url, 'screenshots/'+ Date.now() +'-google.png', function(err) {
          if (err) {
              res.json({status: 'ERROR', msg: err});
          } else {
              res.json({status: 'OK'});
          }
        });
      }





  //res.send('Screenshot');
})

app.listen(8888, function () {
  console.log('Example app listening on port 8888!');
});
