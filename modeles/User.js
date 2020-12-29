const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: 'https://stihi.ru/pics/2018/02/08/11668.jpg' },
    posts: [{ type: Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Types.ObjectId, ref: 'Comment' }]
});

module.exports = model('User', schema);
