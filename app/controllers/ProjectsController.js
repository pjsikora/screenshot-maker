var Project = require('../models/Project');

var ProjectCtrl = {
    listAllUndeleted: function (req, res) {
        Project.find({isDeleted: false}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    listAll: function (req, res) {
        Project.find({}, function (err, points) {
            if (err) {
                console.log(err);
            } else {
                res.json(points);
            }
        });
    },

    readProject: function (req, res) {
        var _gp;

        if (req.method === "GET") {
            _gp = req.query;
        } else { // if POST
            _gp = req.body;
        }

        var id = _gp._id;


        Project.findOne({_id: id}, function (err, projects) {
            if (err) {
                console.log(err);
            } else {
                res.json(projects);
            }
        });
    },


    create: function (req, res) {
        var _gp;

        if (req.method === "GET") {
            _gp = req.query;
        } else {
            _gp = req.body;
        }

        var project = new Project();

        project.name = _gp.name;
        project.isOpened = _gp.isOpened;

        project.save(function (err) {
            if (err) {
                res.json({status: 'ERROR', error: JSON.stringify(err)});
            } else {
                res.json({status: 'OK'});
            }
        });
    },

    update: function (req, res) {
        var _gp;

        if (req.method === "GET") {
            _gp = req.query;
        } else {
            _gp = req.body;
        }

        var projectID = _gp._id,
            newProjectData = {};


        if (_gp.name) {
            newProjectData.name = _gp.name;
        }
        if (_gp.description) {
            newProjectData.description = _gp.description;
        }
        if (_gp.createDate) {
            newProjectData.createDate = _gp.createDate;
        }
        if (_gp.createdBy) {
            newProjectData.createdBy = _gp.createdBy;
        }
        if (_gp.isOpened) {
            newProjectData.isOpened = _gp.isOpened;
        }

        var query = {_id: projectID},
            newData = newProjectData;

        Project.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
            if (err) {
                return res.json({status: "ERROR", error: err.toString()});
            } else {
                return res.json({status: "OK", msg: "succesfully saved"});
            }
        });
    },

    projectHardDelete: function (req, res) {
        Project.remove({_id: req.body._id}, function (err) {
            if (err) {
                res.json({
                    status: 'ERROR'
                });
            } else {
                res.json({
                    status: 'OK'
                });
            }
        });
    },

    projectDelete: function (req, res) {
        // var viewID = req.query._id || req.body._id,
        var viewID = req.body._id,
            query = {
                _id: viewID
            },
            newData = {
                isDeleted: true
            };

        Project.findOneAndUpdate(query, newData, {upsert: true}, function (err, doc) {
            if (err) {
                return res.json({status: "ERROR", error: err.toString()});
            } else {
                return res.json({status: "OK", msg: "succesfully saved"});
            }
        });
    }
}

module.exports = ProjectCtrl;