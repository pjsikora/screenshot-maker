var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var CFG = require('./config');
var Auth = require('./middleware/Auth');

// models
var User = require('./models/User');

// Controllers
var ScreenshotCtrl = require('./controllers/ScreenshotsController');
var ProjectCtrl = require('./controllers/ProjectsController');
var UserController = require('./controllers/UserController');

router.get('/authenticate', UserController.authenticate);

router.use(Auth.loginCheck);

router.get('/screenshot/create', ScreenshotCtrl.create);
router.get('/screenshot/read', ScreenshotCtrl.read);
router.get('/screenshot/list', ScreenshotCtrl.listAll);

router.get('/project/create', ProjectCtrl.create);
router.get('/project/list', ProjectCtrl.listAll);
router.get('/project/read', ProjectCtrl.readProject);
router.get('/project/update', ProjectCtrl.update);
router.get('/project/delete/:id', ProjectCtrl.projectDelete);

module.exports = router;