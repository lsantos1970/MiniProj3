const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const expertSchema = new Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
      },
      phone: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        enum: ['dogs', 'cats', 'birds', 'xxxxx'], // Valores baseados no HTML
        required: true,
      },
    }, {
      timestamps: true, // Adiciona createdAt e updatedAt
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, expertSchema);