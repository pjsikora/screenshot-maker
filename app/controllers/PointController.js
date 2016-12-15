var Point = require('../models/Point');
var CH = require('../helpers/ControllerHelper');

var points = {
    listAllUndeleted: function (req, res) {
        Point.find({isDeleted: false}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    listAll: function (req, res) {
        Point.find({}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    create: function (req, res) {
        var _gp = CH.m2v(req);
        var point = new Point();

        point.name = _gp.name;
        point.x = _gp.x;
        point.y = _gp.y;
        point.createdBy = _gp.createdBy;
        point.screenshotID = _gp.screenshotID;

        point.save(function (err) {
            if (err) {
                res.json({status: 'ERROR', error: JSON.stringify(err)})
            }

            else
                res.json({status: 'OK'});
        });
    },

    read: function (req, res) {
        var _gp = CH.m2v(req);
        var viewID = _gp.viewID;

        Point.find({viewID: viewID}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    close: function (req, res) {
        var _gp = CH.m2v(req);
        var query = {_id: _gp._id};
        var newData = {isOpened: false};

        points.update(query, newData, res);
    },

    open: function (req, res) {
        var _gp = CH.m2v(req);
        var query = {_id: _gp._id};
        var newData = {isOpened: true};

        points.update(query, newData, res);
    },

    update: function (query, newData, res) {
        Point.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
            if (err) {
                return res.json({status: "ERROR", error: err.toString()});
            } else {
                return res.json({status: "OK", msg: "succesfully saved"});
            }
        })
    },

    readUndeleted: function (req, res) {
        var _gp = CH.m2v(req);
        var viewID = _gp.viewID;

        Point.find({viewID: viewID, isDeleted: false}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    deleteHard: function (req, res) {
        var _gp = CH.m2v(req);

        Point.remove({_id: _gp._id}, function (err) {
            if (err) {
                res.json({
                    status: 'ERROR',
                });
            }
            else {
                res.json({
                    status: 'OK',
                });
            }
        });
    },

    deleteItem: function (req, res) {
        var _gp = CH.m2v(req);
        var id = _gp._id;
        var query = {
            _id: id
        };
        var newData = {
            isDeleted: true
        };

        Point.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
            if (err) {
                return res.json({status: "ERROR", error: err.toString()});
            } else {
                return res.json({status: "OK", msg: "succesfully saved"});
            }
        });
    }
}

module.exports = points;