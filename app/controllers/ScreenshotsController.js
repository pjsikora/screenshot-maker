var webshot = require('webshot');
var fs = require('fs');


var Screenshot = {
    create: function (req, res) {
        var _gp;

        if (req.method === "GET") {
            _gp = req.query;
        } else {
            _gp = req.body;
        }

        var url = _gp.url,
            projectID = _gp.projectID,

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
            var fileDestination = 'screenshots/'+ projectID + '/' + Date.now() + '-' + url + '.png';

            webshot(url, fileDestination, options, function (err) {
                if (err) {
                    res.json({status: 'ERROR', msg: err});
                } else {
                    res.json({status: 'OK', fileDestination: fileDestination});
                }
            });
        }
    }

    ,

    read: function (req, res) {
        console.log(req.params.id);

        var urlID = req.params.id,
            file = "screenshots/" + urlID;

        // Check if file exists
        if (fs.existsSync(file)) {
            // File exists so lets bring the base64 from it
            fs.readFile(file, function (err, original_data) {
                var base64Image = original_data.toString('base64');

                res.send(base64Image);
                // res.send('<img src="data:image/png;base64,' + base64Image + '"/>');
            });
        } else {
            // File doesnt exist - lets throw an error
            res.json({status: "ERRROR", msg: "File doesnt exists"});
        }

        // res.json({status: 'OK'})
    }
}

module.exports = Screenshot;