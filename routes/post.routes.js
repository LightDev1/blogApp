const { Router } = require('express');
const Post = require('../modeles/Post');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/publish', auth, async (req, res) => {
    try {

        const { title, text } = req.body;

        const post = new Post({
            title, text, author: req.user.userId
        });

        await post.save();

        res.status(201).json({ post });

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/my_posts', auth, async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find()
        res.json({ posts });
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.post('/:id', auth, async (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

module.exports = router;