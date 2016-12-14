var User = require('../models/User');
var jwt = require('jsonwebtoken');
var CH = require('../helpers/ControllerHelper');
var CFG = require('../config');

var UserController = {
    authenticate: function(req, res) {

        // find the user
        User.findOne({
            name: req.query.name
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (user.password != req.query.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, CFG.secret, {
                        expiresIn: 3000,
                        // expiresInMinutes: 1440 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }

        });
    }

    // listAllUndeleted: function (req, res) {
    //     Point.find({isDeleted: false}, function (err, points) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.json(points);
    //         }
    //     });
    // },
    //
    // listAll: function (req, res) {
    //     Point.find({}, function (err, points) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.json(points);
    //         }
    //     });
    // },
    //
    // create: function (req, res) {
    //     var _gp = CH.m2v(req);
    //     var point = new Point();
    //
    //     point.name = _gp.name;
    //     point.x = _gp.x;
    //     point.y = _gp.y;
    //     point.createdBy = _gp.createdBy;
    //     point.screenshotID = _gp.screenshotID;
    //
    //     point.save(function (err) {
    //         if (err) {
    //             res.json({status: 'ERROR', error: JSON.stringify(err)})
    //         }
    //
    //         else
    //             res.json({status: 'OK'});
    //     });
    // },
    //
    // read: function (req, res) {
    //     var _gp = CH.m2v(req);
    //     var viewID = _gp.viewID;
    //
    //     Point.find({viewID: viewID}, function (err, points) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.json(points);
    //         }
    //     });
    // },
    //
    // close: function (req, res) {
    //     var _gp = CH.m2v(req);
    //     var query = {_id: _gp._id};
    //     var newData = {isOpened: false};
    //
    //     points.update(query, newData, res);
    // },
    //
    // open: function (req, res) {
    //     var _gp = CH.m2v(req);
    //     var query = {_id: _gp._id};
    //     var newData = {isOpened: true};
    //
    //     points.update(query, newData, res);
    // },
    //
    // update: function (query, newData, res) {
    //     Point.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
    //         if (err) {
    //             return res.json({status: "ERROR", error: err.toString()});
    //         } else {
    //             return res.json({status: "OK", msg: "succesfully saved"});
    //         }
    //     })
    // },
    //
    // readUndeleted: function (req, res) {
    //     var _gp = CH.m2v(req);
    //     var viewID = _gp.viewID;
    //
    //     Point.find({viewID: viewID, isDeleted: false}, function (err, points) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             res.json(points);
    //         }
    //     });
    // },
    //
    // deleteHard: function (req, res) {
    //     Point.remove({_id: req.body._id}, function (err) {
    //         if (err) {
    //             res.json({
    //                 status: 'ERROR',
    //             });
    //         }
    //         else {
    //             res.json({
    //                 status: 'OK',
    //             });
    //         }
    //     });
    // },
    //
    // deleteItem: function (req, res) {
    //     var _gp = CH.m2v(req);
    //     var id = _gp._id;
    //     var query = {
    //         _id: id
    //     };
    //     var newData = {
    //         isDeleted: true
    //     };
    //
    //     Point.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
    //         if (err) {
    //             return res.json({status: "ERROR", error: err.toString()});
    //         } else {
    //             return res.json({status: "OK", msg: "succesfully saved"});
    //         }
    //     });
    // }
}

module.exports = UserController;