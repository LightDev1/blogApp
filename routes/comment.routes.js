const { Router } = require('express');
const router = Router();
const Comment = require('../modeles/Comment');
const User = require('../modeles/User');
const Post = require('../modeles/Post');
const auth = require('../middleware/auth.middleware');

router.post('/create', auth, async (req, res) => {
    try {
        const { text, post } = req.body;

        const author = await User.findById(req.user.userId);
        const postId = await Post.findById(post);

        const comment = new Comment({
            text, post: postId, author, authorUsername: author.username,
        });

        await comment.save();

        res.status(201).json({ comment });

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e.message });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { postId } = req.body;

        const comments = await Comment.find({ post: postId });

        res.json(comments);

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e.message });
    }
});

module.exports = router;