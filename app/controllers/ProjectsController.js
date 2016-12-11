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
        // var id = req.query.id || req.body.id;
        var id = req.body.id;
        console.log(id);

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
        project.createdBy = _gp.createdBy;
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
        // var projectID = req.query._id || req.body._id,
        var projectID = req.body._id,
            newProjectData = {};

        // if (req.query.name || req.body.name) {
        //     newProjectData.name = req.query.name || req.body.name;
        // }
        // if (req.query.description || req.body.description) {
        //     newProjectData.description = req.query.description || req.body.description;
        // }
        // if (req.query.createDate || req.body.createDate) {
        //     newProjectData.createDate = req.query.createDate || req.body.createDate;
        // }
        // if (req.query.createdBy || req.body.createdBy) {
        //     newProjectData.createdBy = req.query.createdBy || req.body.createdBy;
        // }
        // if (req.query.isOpened || req.body.isOpened) {
        //     newProjectData.isOpened = req.query.isOpened || req.body.isOpened;
        // }


        if (req.body.name) {
            newProjectData.name = req.body.name;
        }
        if (req.body.description) {
            newProjectData.description = req.body.description;
        }
        if (req.body.createDate) {
            newProjectData.createDate = req.body.createDate;
        }
        if (req.body.createdBy) {
            newProjectData.createdBy = req.body.createdBy;
        }
        if (req.body.isOpened) {
            newProjectData.isOpened = req.body.isOpened;
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