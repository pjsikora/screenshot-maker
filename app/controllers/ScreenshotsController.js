var webshot = require('webshot');
var fs = require('fs');
var Screenshot = require('../models/Screenshot');
var CH = require('../helpers/ControllerHelper');

var ScreenshotController = {
    listAllUndeleted: function (req, res) {
        Screenshot.find({isDeleted: false}, function (err, screenshots) {
            if (err) {
                console.log(err);
            } else {
                res.json(screenshots);
            }
        });
    }

    ,

    listAll: function (req, res) {
        Screenshot.find({}, function (err, screenshots) {
            if (err) {
                console.log(err);
            } else {
                res.json(screenshots);
            }
        });
    }

    ,

    create: function (req, res) {
        var _gp = CH.m2v(req);
        var url = _gp.url;
        var projectID = _gp.projectID;

        var options = {
            renderDelay: _gp.renderDelay || 500,
            screenSize: {
                width: _gp.screenWidth || 1000,
                height: 480
            },
            shotSize: {
                width: _gp.screenWidth || 1000,
                height: 'all'
            },
            userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.20 (KHTML, like Gecko) Mobile/7B298g'
        };

        if (typeof url === undefined || typeof url === "undefined") {
            res.json({status: 'ERROR', msg: 'no url'});
        } else {
            var fileDestination = 'screenshots/' + projectID + '/' + Date.now() + '-' + url + '.png';

            webshot(url, fileDestination, options, function (err) {
                if (err) {
                    res.json({status: 'ERROR', msg: err});
                } else {
                    var screenshot = new Screenshot();

                    screenshot.name = _gp.name || Date.now() + '-' + url + '.png';
                    screenshot.description = _gp.description;
                    screenshot.projectID = projectID;
                    screenshot.fileURL = fileDestination;

                    screenshot.save(function (err) {
                        if (err) {
                            res.json({status: 'ERROR', error: JSON.stringify(err)});
                        } else {
                            res.json({status: 'OK', fileDestination: fileDestination});
                        }
                    });
                }
            });
        }
    }

    ,

    read: function (req, res) {
        var _gp = CH.m2v(req);
        var urlID = _gp._id;
        var file = "screenshots/" + urlID;
        var projectID = _gp.projectID;

        Screenshot.find({projectID: projectID}, function (err, screenshots) {
            if (err) {
                console.log(err);
            } else {
                res.json(screenshots);
            }
        });

        // Check if file exists
        // if (fs.existsSync(file)) {
        //     // File exists so lets bring the base64 from it
        //     fs.readFile(file, function (err, original_data) {
        //         var base64Image = original_data.toString('base64');
        //
        //         res.send(base64Image);
        //         // res.send('<img src="data:image/png;base64,' + base64Image + '"/>');
        //     });
        // } else {
        //     // File doesnt exist - lets throw an error
        //     res.json({status: "ERRROR", msg: "File doesnt exists"});
        // }
        // res.json({status: 'OK'})
    }

    ,

    responseFile: function (req, res) {
        var _gp = CH.m2v(req);
        var screenshotID = _gp._id;

        Screenshot.findOne({_id: screenshotID}, function (err, screenshot) {
            if (err) {
                console.log(err);
            }
            if (screenshot) {
                var filePath = screenshot.fileURL;

                fs.exists(filePath, function (exists) {
                    if (exists) {
                        res.writeHead(200, {
                            "Content-Type": "image/png"
                        });
                        fs.createReadStream(filePath).pipe(res);
                    } else {
                        res.writeHead(400, {"Content-Type": "text/plain"});
                        res.end("ERROR File does NOT Exists");
                    }
                });
            }
        });
    }

    ,

    getFile: function (req, res) {
        var _gp = CH.m2v(req);

    }

    ,

    getScreenshotsByProject: function (req, res) {
        var _gp = CH.m2v(req);
        var projectID = _gp.projectID;

    }
}

module.exports = ScreenshotController;