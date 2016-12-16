var HTMLvalidator = require('html-validator');
var CH = require('../helpers/ControllerHelper');

var HTMLValidationController = {
    create: function(req, res) {
        var options = {url: req.param("url"), format: 'json'};

        console.log(req.param("url"));

        HTMLvalidator(options, function (err, data) {
            if (err) {
                res.json(err);
                throw err
            }

            res.json(data);
        });
    }
}

module.exports = HTMLValidationController;