const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    posts: [{ type: Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }]
});

module.exports = model('User', schema);
