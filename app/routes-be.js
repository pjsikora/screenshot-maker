var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var CFG = require('./config')

// models
var User = require('./models/User');

// Controllers
var ScreenshotCtrl = require('./controllers/ScreenshotsController');
var ProjectCtrl = require('./controllers/ProjectsController');
var UserController = require('./controllers/UserController');

router.get('/authenticate', UserController.authenticate);

// router.use(function (req, res, next) {
//     // var token = req.body.token || req.query.token || req.headers['x-access-token'];
//     var token = req.query.token;
//
//     if (token) {
//         jwt.verify(token, CFG.secret, function (err, decoded) {
//             if (err) {
//                 return res.json({success: false, message: 'Failed to authenticate token.'});
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// });


router.get('/screenshot/create', ScreenshotCtrl.create);
router.get('/screenshot/read', ScreenshotCtrl.read);
router.get('/screenshot/list', ScreenshotCtrl.listAll);

router.get('/project/create', ProjectCtrl.create);
router.get('/project/list', ProjectCtrl.listAll);
router.get('/project/read', ProjectCtrl.readProject);
router.get('/project/update', ProjectCtrl.update);
router.get('/project/delete/:id', ProjectCtrl.projectDelete);

// router.get('/setup', function(req, res) {
//
//     // create a sample user
//     var nick = new User({
//         name: 'piotr',
//         password: 'admin',
//         admin: true
//     });
//
//     // save the sample user
//     nick.save(function(err) {
//         if (err) throw err;
//
//         console.log('User saved successfully');
//         res.json({ success: true });
//     });
// });

// apiRoutes.get('/', function(req, res) {
//     res.json({ message: 'Welcome to the coolest API on earth!' });
// });

// route to return all users (GET http://localhost:8080/api/users)
// router.get('/users', UserController.);


module.exports = router;