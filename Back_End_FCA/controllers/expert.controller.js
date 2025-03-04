const Expert = require('../models/expert.model');
const { validationResult } = require('express-validator');
const ExpertMessages = require('../messages/expert.messages');

exports.get = (req, res) => {
    Expert.find(req.query).exec((error, experts) => {
        if (error) throw error;

        let message = ExpertMessages.success.s2;

        if (experts.length <= 0)
            message = ExpertMessages.success.s5;

        message.body = experts;
        return res.status(message.http).send(message);
    });
};

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Expert(req.body).save((error, expert) => {
        if (error) throw error;

        let message = ExpertMessages.success.s0;
        message.body = expert;
        return res.header("location", "/experts/" + expert._id).status(message.http).send(message);
    });
};

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Expert.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true },
        (error, expert) => {
            if (error) throw error;
            if (!expert) return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

            let message = ExpertMessages.success.s1;
            message.body = expert;
            return res.status(message.http).send(message);
        }
    );
};

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Expert.deleteOne({ _id: req.params.id }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

        return res.status(ExpertMessages.success.s3.http).send(ExpertMessages.success.s3);
    });
};

exports.getOne = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Expert.findOne({ _id: req.params.id }).exec((error, expert) => {
        if (error) throw error;
        if (!expert) return res.status(ExpertMessages.error.e0.http).send(ExpertMessages.error.e0);

        let message = ExpertMessages.success.s2;
        message.body = expert;
        return res.status(message.http).send(message);
    });
};
