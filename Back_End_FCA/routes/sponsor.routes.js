const express = require('express');
let router = express.Router();
const SponsorController = require('../controllers/sponsor.controller');
const { body, param, sanitizeBody } = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(AuthController.checkAuth, SponsorController.get)
    .post(AuthController.checkAuth, [
        body('name').isString().not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('phone').isString().not().isEmpty().withMessage('Phone is required'),
        body('category').isIn(['dogs', 'cats', 'birds', 'xxxxx']).withMessage('Invalid category'),
        body('website').optional().isURL().withMessage('Invalid website URL'),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], SponsorController.create);

router.route('/:id')
    .get(AuthController.checkAuth, [param('id').isMongoId()], SponsorController.getOne)
    .put(AuthController.checkAuth, [
        param('id').isMongoId(),
        body('name').optional().isString().not().isEmpty().withMessage('Name is required'),
        body('email').optional().isEmail().withMessage('Valid email is required'),
        body('phone').optional().isString().not().isEmpty().withMessage('Phone is required'),
        body('category').optional().isIn(['dogs', 'cats', 'birds', 'xxxxx']).withMessage('Invalid category'),
        body('website').optional().isURL().withMessage('Invalid website URL')
    ], SponsorController.update)
    .delete(AuthController.checkAuth, [param('id').isMongoId()], SponsorController.delete);

module.exports = router;
