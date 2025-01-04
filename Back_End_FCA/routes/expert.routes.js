const express = require('express');
const router = express.Router();
const ExpertController = require('../controllers/expert.controller');
const { body, param, sanitizeBody } = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, ExpertController.get)
    .post(AuthController.checkAuth, [
        body('name').isString().not().isEmpty(),
        body('email').isEmail(),
        body('phone').isString().not().isEmpty(),
        body('category').isIn(['dogs', 'cats', 'birds', 'xxxxx']),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], ExpertController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param('id').isMongoId()], ExpertController.getOne)
    .put(AuthController.checkAuth, [param('id').isMongoId()], ExpertController.update)
    .delete(AuthController.checkAuth, [param('id').isMongoId()], ExpertController.delete);

module.exports = router;
