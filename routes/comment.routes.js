const { Router } = require('express');
const { Types } = require('mongoose');
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
            text, post: postId, author, authorUsername: author.username, authorProfilePic: author.profilePicture,
        });

        await comment.save();

        await User.findByIdAndUpdate(req.user.userId, { comments: [...author.comments, comment] });
        await Post.findByIdAndUpdate(postId, { comments: [...author.comments, comment] });

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

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const author = await User.findById(req.user.userId);

        const newArray = author.comments;
        const index = author.comments.indexOf(req.params.id);
        newArray.splice(index, 1);

        await Comment.findByIdAndDelete(req.params.id);

        await User.findByIdAndUpdate(req.user.userId, { comments: newArray });

        res.json({ message: 'Коммент был успешно удален' });
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e.message });
    }
});

module.exports = router;