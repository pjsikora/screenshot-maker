var Point = require('../models/Point');

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
        var point = new Point();

        // point.name = req.query.name || req.body.name;
        // point.x = req.query.x || req.body.x;
        // point.y = req.query.y || req.body.y;
        // point.createdBy = req.query.createdBy || req.body.createdBy;
        // point.viewID = req.query.viewID || req.body.viewID;

        point.name = eq.body.name;
        point.x = req.body.x;
        point.y = req.body.y;
        point.createdBy = req.body.createdBy;
        point.viewID = req.body.viewID;

        point.save(function (err) {
            if (err) {
                res.json({status: 'ERROR', error: JSON.stringify(err)})
            }

            else
                res.json({status: 'OK'});
        });

        // return {
        //     get: function () {
        //     },
        //     post: function () {
        //     }
        // }
    },

    read: function (req, res) {
        // var viewID = req.query.viewID || req.body.viewID;
        var viewID = req.body.viewID;

        Point.find({viewID: viewID}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    close: function (req, res) {
        var query = {_id: req.body._id},
            newData = {isOpened: false};

        points.update(query, newData, res);
    },

    open: function (req, res) {
        var query = {_id: req.body._id},
            newData = {isOpened: true};

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
        // var viewID = req.query.viewID || req.body.viewID;
        var viewID = req.body.viewID;

        Point.find({viewID: viewID, isDeleted: false}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    deleteHard: function (req, res) {
        Point.remove({_id: req.body._id}, function (err) {
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
        // var id = req.query._id || req.body._id,
        var id = req.body._id,
            query = {
                _id: id
            },
            newData = {
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