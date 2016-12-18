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
var PointController = require('./controllers/PointController');
var UserController = require('./controllers/UserController');
var HTMLValidationController = require('./controllers/HTMLValidationController');
var SEOChecks = require('./controllers/SEOChecksController');

router.get('/authenticate', UserController.authenticate);
router.get('/validation/html', HTMLValidationController.create);
router.get('/validation/seo', SEOChecks.create);


router.use(Auth.loginCheck);

router.get('/screenshot/create', ScreenshotCtrl.create);
router.get('/screenshot/read', ScreenshotCtrl.read);
router.get('/screenshot/list', ScreenshotCtrl.listAll);
router.get('/screenshot/file', ScreenshotCtrl.responseFile);

router.get('/project/create', ProjectCtrl.create);
router.get('/project/list', ProjectCtrl.listAll);
router.get('/project/read', ProjectCtrl.readProject);
router.get('/project/update', ProjectCtrl.update);
router.get('/project/delete/:id', ProjectCtrl.projectDelete);

router.get('/point/create', PointController.create);
router.get('/point/read', PointController.read);

module.exports = router;