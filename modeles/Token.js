const { Schema, model } = require('mongoose');

const schema = new Schema({
    accessTokenId: { type: String, required: true, unique: true },
    refreshTokenId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
});

module.exports = model('Token', schema);