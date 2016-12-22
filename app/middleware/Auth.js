var jwt = require('jsonwebtoken');
var CFG = require('../config');

var AuthMiddleware = {
    loginCheck: function (req, res, next) {
        var token = req.query.token;

        if (token) {
            jwt.verify(token, CFG.secret, function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token'});
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token'
            });

        }
    }
}

module.exports = AuthMiddleware;