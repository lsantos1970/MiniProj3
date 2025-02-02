const User = require('../models/user.model');
const {
    validationResult
} = require('express-validator');
const AuthMessages = require("../messages/auth.messages");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.getInfo = (req, res) => {
    let message = AuthMessages.success.s1;
    message.body = req.user;
    return res.status(message.http).send(message);
}

exports.login = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    let username = req.body.username;
    let password = escape(req.body.password);

    User.findOne({
        "auth.username": username
    }, (error, user) => {
        if (error) throw error;

        if (!user || !bcrypt.compareSync(password, user.auth.password))
            return res.header("Authorization", null).status(AuthMessages.error.e0.http).send(AuthMessages.error.e0);

        let payload = {
            pk: user.auth.public_key
        }

        let options = {
            expiresIn: CONFIG.auth.expiration_time,
            issuer: CONFIG.auth.issuer
        };

        let token = JWT.sign(payload, user.auth.private_key, options);

        let message = AuthMessages.success.s0;
        message.body = user;
        return res.header("Authorization", token).status(message.http).send(message);

    });

}

exports.checkAuth = (req, res, callback) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(AuthMessages.error.e1.http).send({
            ...AuthMessages.error.e1,
            message: "Authorization header missing",
        });
    }

    let token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho
    if (!token) {
        return res.status(AuthMessages.error.e1.http).send({
            ...AuthMessages.error.e1,
            message: "Token missing in Authorization header",
        });
    }

    let payload;
    try {
        payload = JWT.decode(token); // Decodifica o token
    } catch (error) {
        return res.status(AuthMessages.error.e1.http).send({
            ...AuthMessages.error.e1,
            message: "Failed to decode token",
        });
    }

    if (!payload || !payload.pk) {
        return res.status(AuthMessages.error.e1.http).send({
            ...AuthMessages.error.e1,
            message: "Invalid token structure",
        });
    }

    // Verifica o utilizador associado ao token
    User.findOne({ "auth.public_key": payload.pk }, (error, user) => {
        if (error) {
            return res.status(AuthMessages.error.e1.http).send({
                ...AuthMessages.error.e1,
                message: "Database error",
            });
        }
        if (!user) {
            return res.status(AuthMessages.error.e1.http).send({
                ...AuthMessages.error.e1,
                message: "User not found",
            });
        }

        // Verifica o token com a chave privada do utilizador
        JWT.verify(token, user.auth.private_key, (error) => {
            if (error) {
                return res.status(AuthMessages.error.e1.http).send({
                    ...AuthMessages.error.e1,
                    message: "Failed to verify token",
                });
            }

            req.user = user; // Associa o utilizador autenticado à requisição
            return callback();
        });
    });
};
