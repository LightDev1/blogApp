const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    author: { type: Types.ObjectId, ref: 'User' },
    authorUsername: { type: String },
    post: { type: Types.ObjectId, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

module.exports = model('Comment', schema);