const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({
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
      website: {
        type: String,
        required: false,
        match: /https?:\/\/.+/, // Verifica se é uma URL válida
      },
      photo: {
        type: String, // Pode armazenar o caminho para o ficheiro
        required: false,
      },
    }, {
      timestamps: true, // Adiciona createdAt e updatedAt para registar quando cada documento foi criado ou atualizado
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);