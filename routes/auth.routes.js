const { Router } = require('express');
const User = require('../modeles/User');
const Token = require('../modeles/Token');
const config = require('config');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid');
const auth = require('../middleware/auth.middleware');
const { updateTokens } = require('../helpers/auth.helper');
const router = Router();

router.post(
    '/register',
    [
        check('username', 'Некорректное имя пользователя').isLength({ min: 4 }),
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при регистрации',
                });
            }

            const { username, email, password } = req.body;

            const candidate = await User.findOne({ email });

            if (candidate) {
                res.status(400).json({ message: 'Такой пользователь уже существует' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ username, email, password: hashedPassword });

            await user.save();

            const tokens = await updateTokens(user.id);

            res.status(201).json({ tokens, userId: user.id, username, profilePicture: user.profilePicture, message: 'Пользователь создан' });


        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова', error: e.message });
        }
    });

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists(),
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные при входе в систему',
                });
            }

            const { email, password } = req.body;

            const user = await User.findOne({ email });

            console.log(user.username);

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль' });
            }

            const tokens = await updateTokens(user.id);

            res.json({ tokens, userId: user.id, username: user.username, profilePicture: user.profilePicture });

        } catch (e) {
            res.status(500).json({ message: `Что-то пошло не так, попробуйте снова ${e.message}` });
        }
    });

router.post('/refresh-tokens', async (req, res) => {
    const { refreshToken } = req.body;
    let payload;

    try {
        payload = jwt.verify(refreshToken, config.get('jwt').secret);

        if (payload.type != 'refresh') {
            return res.status(400).json({ message: 'Невалидный токен 1' });
        }
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            return res.status(400).json({ message: 'Истекло время дейсвия токена' });
        }
        else if (e instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Невалидный токен 2' })
        }
    }

    const token = await Token.findOne({ refreshTokenId: payload.id });

    if (!token) {
        throw new Error('Невалидный токен 3');
    }

    const tokens = await updateTokens(token.userId);

    res.json(tokens);

});

router.post('/upload', auth, async (req, res) => {
    try {
        const { profilePicture } = req.body;

        await User.findByIdAndUpdate(req.user.userId, { profilePicture });

        res.json({ profilePicture });
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/user-short-data', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        res.json({ profilePicture: user.profilePicture, username: user.username });
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
});


module.exports = router;