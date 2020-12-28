const { Router } = require('express');
const Post = require('../modeles/Post');
const User = require('../modeles/User');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/publish', auth, async (req, res) => {
    try {

        const { title, text, thumbnail } = req.body;

        const author = await User.findById(req.user.userId);

        const post = new Post({
            title, text, author: req.user.userId, authorUsername: author.username, thumbnail,
        });

        await post.save();

        res.status(201).json({ post });

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/user_posts/:id', auth, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.id });
        res.json(posts);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json({ posts });
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

module.exports = router;