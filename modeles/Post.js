const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    // thumbnail: {type: }
    date: { type: Date, default: Date.now },
    author: { type: Types.ObjectId, ref: 'User' },
    authorUsername: { type: String, required: true },
    comments: [{ type: Types.ObjectId, ref: 'Comment' }],
});

module.exports = model('Post', schema);