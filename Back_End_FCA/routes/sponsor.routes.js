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

/**
 * @swagger
 * /sponsors:
 *   get:
 *     summary: Lista todos os sponsors
 *     responses:
 *       200:
 *         description: Lista de sponsors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   phone:
 *                     type: string
 *                   category:
 *                     type: string
 *                   website:
 *                     type: string
 *   post:
 *     summary: Cria um novo sponsor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               category:
 *                 type: string
 *               website:
 *                 type: string
 *     responses:
 *       201:
 *         description: Sponsor criado com sucesso
 */

/**
 * @swagger
 * /sponsors/{id}:
 *   get:
 *     summary: Obtém um sponsor por ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados do sponsor
 *       404:
 *         description: Sponsor não encontrado
 */
